/*
 * Rest API for questions.

 */
import {list, LeanDocument} from 'keystone';
import {Request, Response, NextFunction, Router} from 'express';
import * as jsonPatch from 'json-patch';
import {OK, UNPROCESSABLE_ENTITY, INTERNAL_SERVER_ERROR, NOT_FOUND} from 'http-status-codes';
import {UserDocument} from '../../models/User';
import {Question, QuestionDocument} from '../../models/Question';
import {requireUser} from '../middleware';
import ApiHooks from './apiHooks';
/**
 * Patch wrong typings for mongoose validation error
 */
const STATUS_OK = {status: "ok"};
const status = (s: string, err?: any) => ({status: s, err});
const questionModel = () => list<Question>('Question').model;

interface ValidationError extends Error {
  errors: {};
}

export const questions: Router = Router();

export const hooks = new ApiHooks<Question>();
/**
 * Get all questions. Respects permissions and only fetches accepted
 * for regular users.
 */
async function getAll(req: Request, res: Response, next: NextFunction) {
  const user = req.user as UserDocument;
  const query = req.query;
  const filter = user ? {} : {archived: false, accepted: true};
  const q = await questionModel().find(filter).sort({dateAccepted: 1}).exec();
  res.json(q);
  hooks.call('read', q);
}

async function getOne(req: Request, res: Response, next: NextFunction) {
  const user = req.user as UserDocument;
  const id = req.params.questionId;
  const filter = user ? {_id: id} : {_id: id, archived: false, accepted: true};
  const q = await questionModel().findOne(filter);
  if (q !== null) {
    res.json(q);
    hooks.call('read', q);
  } else {
    res.sendStatus(NOT_FOUND);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    // prevent the user from self-accepting questions by adding 'accepted: true',
    // so only askedBy, text, forEvent and toPerson
    const {askedBy, text, forEvent, toPerson} = req.body;
    const q = await questionModel().create({askedBy, text, event});
    res.send(q);
    hooks.call('create', q);
  } catch (e) {
    if (e instanceof Error && e.name === 'ValidationError') {
      const err = e as ValidationError;
      res.status(UNPROCESSABLE_ENTITY).send(status('error', err));
    } else {
      res.sendStatus(INTERNAL_SERVER_ERROR);
    }
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  const id = req.params.questionId;
  console.log(`update ${id}`);
  const q = await questionModel().findById(id);
  if (q === null) {
    res.sendStatus(NOT_FOUND);
    return;
  }
  const prevState = q.toObject() as LeanDocument<Question>;
  if (req.method === 'PATCH') {
    try {
      jsonPatch.apply(q, req.body);
    } catch (e) {
      res.status(UNPROCESSABLE_ENTITY).send(status('error', e));
      return;
    }
  } else {
    // do a merge patch/a replace
    Object.assign(q, req.body);
  }
  await q.save();
  res.json(q);
  hooks.call('update', prevState, q.toObject() as LeanDocument<Question>);
}

questions.get('/', getAll);
questions.post('/', create);
questions.get('/:questionId', getOne);
// TODO: set up authentication for put and patch
questions.put('/:questionId', update);
questions.patch('/:questionId', update);
// questions.post('/:questionId', requireUser, )

export default questions;




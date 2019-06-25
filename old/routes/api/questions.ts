/*
 * Rest API for questions.

 */
import {list, RawDocument} from 'keystone';
import {Request, Response, NextFunction, Router} from 'express';
import * as jsonPatch from 'json-patch';
import {OK, CREATED, UNPROCESSABLE_ENTITY, INTERNAL_SERVER_ERROR, NOT_FOUND} from 'http-status-codes';
import {UserDocument} from '../../models/User';
// import {isAdmin} from '../../routes/api/auth';
import {Question, QuestionDocument} from '../../models/Question';
import ApiHookEmitter from './apiHooks';
import * as auth from '../api/auth';

// status codes
const INVALID_ENTITY_FORMAT = 'INVALID_ENTITY_FORMAT';
/**
 * Patch wrong typings for mongoose validation error
 */

const questionModel = () => list<Question>('Question').model;
interface ValidationError extends Error {
  errors: {};
}

export const questions = Router();

export const hooks = new ApiHookEmitter<Question>();
/**
 * Get all questions. Respects permissions and only fetches accepted
 * for regular users.
 */
async function getAll(req: Request, res: Response, next: NextFunction) {
  const query = req.query;
  // Only admins can get archived and non-accepted questions
  const filter = req.user ? {} : {archived: false, accepted: true};
  const q = await questionModel().find(filter).sort({dateAdded: 1, dateAccepted: 1}).exec();
  res.json(q);
  hooks.emit('read', q);
}

async function getOne(req: Request, res: Response, next: NextFunction) {
  const id = req.params.questionId;
  // Only admins can get archived and non-accepted questions
  const filter =  {_id: id, ...req.user ? {} : {archived: false, accepted: true}};
  const q = await questionModel().findOne(filter);
  if (q !== null) {
    res.json(q);
    hooks.emit('read', q);
  } else {
    res.sendStatus(NOT_FOUND);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    // prevent the user from self-accepting questions by adding 'accepted: true',
    // so only askedBy, text, forEvent and toPerson
    const {askedBy, text, forEvent, toPerson} = req.body;
    const q = await questionModel().create({askedBy, text, forEvent, toPerson});
    res.status(CREATED).json(q);
    hooks.emit('create', q);
  } catch (e) {
    if (e instanceof Error && e.name === 'ValidationError') {
      const err = e as ValidationError;
      res.status(UNPROCESSABLE_ENTITY).json({message: INVALID_ENTITY_FORMAT, error: err});
    } else {
      console.log(e);
      res.sendStatus(INTERNAL_SERVER_ERROR);
    }
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  const id = req.params.questionId;
  const q = await questionModel().findById(id);
  if (q === null) {
    res.sendStatus(NOT_FOUND);
    return;
  }
  // Save previous state of the question object for hooks
  const prevState = q.toObject() as RawDocument<Question>;
  // either do a patch by applying RFC6902 JSON patch
  if (req.method === 'PATCH') {
    try {
      jsonPatch.apply(q, req.body);
    } catch (e) {
      res.status(UNPROCESSABLE_ENTITY).send({message: INVALID_ENTITY_FORMAT, error: e});
      return;
    }
  } else if (req.method === 'PUT') {
    // do a merge patch/replace
    Object.assign(q, req.body);
  }
  await q.save();
  res.json(q);
  const nextState = q.toObject() as RawDocument<Question>;
  hooks.emit('update', prevState, nextState);
}

questions.get('/', auth.authenticateWihoutRedirect, getAll);
questions.post('/', create);
questions.get('/:questionId', auth.authenticateWihoutRedirect, getOne);
// TODO: set up authentication for put and patch
questions.put('/:questionId', auth.requireUser, update);
questions.patch('/:questionId', auth.requireUser, update);

export default questions;

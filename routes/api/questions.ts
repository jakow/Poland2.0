/*
 * Rest API for questions.

 */
import {list} from 'keystone';
import {Request, Response, NextFunction, Router} from 'express';
import {UserDocument} from '../../models/User';
import {Question, QuestionDocument} from '../../models/Question';
import {requireUser} from '../middleware';
import {OK, ACCEPTED, UNPROCESSABLE_ENTITY, INTERNAL_SERVER_ERROR, NOT_FOUND} from 'http-status-codes';
/**
 * Patch wrong typings for mongoose validation error
 */
interface ValidationError extends Error {
  errors: {};
}

const STATUS_OK = {status: "ok"};

export const questions: Router = Router();

/**
 * Get all questions. Respects permissions and only fetches accepted
 * for regular users.
 */
async function getAll(req: Request, res: Response, next: NextFunction) {
  const user = req.user as UserDocument;
  const query = req.query;
  const filter = user ? {} : {archived: false, accepted: true};
  const q = await list<Question>('Question').model.find(filter).exec();
  res.send(q);
}

async function getOne(req: Request, res: Response, next: NextFunction) {
  const user = req.user as UserDocument;
  const id = req.params.questionId;
  const filter = user ? {_id: id} : {_id: id, archived: false, accepted: true};
  try {
    const q = await list<Question>('Question').model.findOne(filter);
    if (q) {
      res.json(q);
    } else {
      res.sendStatus(NOT_FOUND);
    }
  } catch (e) {
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    // prevent the user from self-accepting questions by adding 'accepted: true'
    const {askedBy, text, event} = req.body;
    const q = await list<Question>('Question').model.create({askedBy, text, event});
    res.status(ACCEPTED).send(q);
  } catch (e) {
    if (e instanceof Error && e.name === 'ValidationError') {
      const err = e as ValidationError;
      res.status(UNPROCESSABLE_ENTITY).send(err);
    } else {
      res.sendStatus(INTERNAL_SERVER_ERROR);
    }
  }
}

questions.get('/', getAll);
questions.post('/', create);
questions.get('/:questionId', getOne);
// questions.post('/:questionId', requireUser, )

export default questions;




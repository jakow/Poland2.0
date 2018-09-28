import { Router } from 'express';
import * as CORS from 'cors';
import { agenda } from './agenda';
import { teamMembers } from './teamMembers';
import { events } from './events';
import questions from './questions';
import { login } from './login';
import { speakers } from './speakers';

const router = Router();
router.all(/\/.*/, CORS());
router.use('/agenda', agenda);
router.use('/events', events);
router.use('/login', login);
router.use('/questions', questions);
router.use('/speakers', speakers);
router.use('/teamMembers', teamMembers);

export default router;

import 'isomorphic-fetch';
import * as SocketIO from 'socket.io-client';
import {Question as Q} from '../models/Question';

interface Question extends Q {
  _id: string;
}
let questions: Question[];

document.addEventListener("DOMContentLoaded", async () => {
  const io = SocketIO();
  try {
    questions = await ( (await fetch('/api/questions')).json()) as Question[];
  } catch (e) {
    console.error('Failed to fetch questions');
  } finally {
    console.log(questions);
  }
  io.on('welcome message', console.log);
  io.on('question', (q: Question) => {
    questions = addOrUpdate(q);
    console.log(questions);
  });
  io.on('remove question', (qid: string) => {
    console.log('remove question');
    questions = questions.filter((q) => q._id !== qid);
    console.log(questions);
  });
});

async function question(res: Response) {
  const question = await res.json() as Question;
  question.dateAccepted = new Date(question.dateAccepted); // parse date
}

function byDateAccepted(a: Question, b: Question) {
  return Number(a.dateAccepted) - Number(b.dateAccepted);
}

function addOrUpdate(q: Question) {
    const idx = questions.findIndex((question: Question) => question._id === q._id);
    if (idx >= 0) {
      console.log(`found question ${q._id}!`);
      questions[idx] = q;
    } else {
      questions.push(q);
    }
    return questions.sort(byDateAccepted);
}

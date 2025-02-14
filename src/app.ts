import express from 'express';
import { LessonController } from './controllers/LessonController';

export const app = express();

app.use(express.json());

const lessonController = new LessonController();

app.post('/lessons', lessonController.create.bind(lessonController));
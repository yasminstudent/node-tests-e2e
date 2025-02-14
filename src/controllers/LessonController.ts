import { Request, Response } from 'express';
import { CreateLessonFactory } from '../factories/CreateLessonFactory';

export class LessonController
{
    async create(request: Request, response: Response)
    {
        const { title, description } = request.body;

        const createLessonFactory = new CreateLessonFactory();
        const createLesson = createLessonFactory.create();
      
        try {
          await createLesson.execute({ title, description });
          return response.status(201).send();
        } catch (err: any) {
          return response.status(400).json({
            error: err.message,
          });
        }
    }
}
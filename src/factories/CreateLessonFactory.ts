import { PrismaLessonsRepository } from "../repositories/prisma/PrismaLessonsRepository";
import { CreateLesson } from "../services/CreateLesson";
import { CreateLessonService } from "../services/interfaces/CreateLessonService";

export class CreateLessonFactory
{
    create(): CreateLessonService
    {
        const prismaLessonsRepository = new PrismaLessonsRepository();
        return new CreateLesson(prismaLessonsRepository);
    }
}
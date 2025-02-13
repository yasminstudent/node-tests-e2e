import { prisma } from "../../prisma";
import { CreateLessonData, LessonsRepository } from "../interfaces/LessonsRepository";

/**
 * Representa o repositório da lição, utilizando o banco prisma.
 * 
 * @class PrismaLessonsRepository
 */
export class PrismaLessonsRepository implements LessonsRepository {

  /**
   * Cria uma lição no banco.
   * 
   * @param {CreateLessonData} data - Dados da lição
   */
  async create(data: CreateLessonData) {
    await prisma.lesson.create({
      data
    })
  }
}

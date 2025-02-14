import { Lesson } from "../../entities/Lesson";
import { CreateLessonData, LessonsRepository } from "../../repositories/interfaces/LessonsRepository";
import crypto from 'node:crypto';

/**
 * Representa o repositório (em memória) da lição.
 * 
 * @class InMemoryLessonsRepository
 */
export class InMemoryLessonsRepository implements LessonsRepository {

    public items: Lesson[] = [];

    /**
     * Adiciona uma lição na memória.
     * 
     * @param {CreateLessonData} data - Dados da lição
     */
    async create(data: CreateLessonData) {
        this.items.push({
            id: crypto.randomUUID(),
            title: data.title,
            description: data.description ?? null
        });
    }
}

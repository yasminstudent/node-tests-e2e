import { CreateLessonRequest } from "./CreateLessonRequest";

/**
 * Representa o serviço para a criação de uma lição.
 * 
 * @interface CreateLessonService
 */
export interface CreateLessonService {
    execute(data: CreateLessonRequest): Promise<void>;
}
/**
 * Representa os dados necessários para a criação de uma lição.
 * 
 * @interface CreateLessonData
 */
export interface CreateLessonData {
  title: string;
  description?: string;
}

/**
 * Representa o Repository de uma lição
 * 
 * @interface LessonsRepository
 */
export interface LessonsRepository {
  create(data: CreateLessonData): Promise<void>
}
/**
 * Representa os dados da requisição para a criação de uma lição.
 * 
 * @interface CreateLessonData
 */
export interface CreateLessonRequest {
    title: string;
    description?: string;
}
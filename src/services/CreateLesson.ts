import { LessonsRepository } from "../repositories/interfaces/LessonsRepository";
import { CreateLessonRequest } from "./interfaces/CreateLessonRequest";

/**
 * Representa o caso de uso: criação de uma lição.
 * 
 * @class CreateLesson
 */
export class CreateLesson {

  /**
   * Define o atributo da classe.
   * 
   * @param {LessonsRepository} lessonsRepository - Repositório da lição.
   */
  constructor(
    private lessonsRepository: LessonsRepository,
  ) {}

  /**
   * Executa a criação da lição.
   * 
   * @param {CreateLessonRequest} title, description - Dados da lição.
   */
  async execute({ title, description }: CreateLessonRequest) {
    //Validações
    if (!title) {
      throw new Error('Title is required.')
    }

    //... poderia validar se já existe uma lição com o titulo recebido e entre outras validações ...

    //Criação
    await this.lessonsRepository.create({
      title, 
      description
    })

    //Aqui aplicamos Command/Query Segregation -> Ações de escrita/update/delete não precisam de retorno
    //Por isso não estamos retornando nada nesse método
  }
}
import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Loogbook,
  Person,
} from '../models';
import {LoogbookRepository} from '../repositories';

export class LoogbookPersonController {
  constructor(
    @repository(LoogbookRepository)
    public loogbookRepository: LoogbookRepository,
  ) { }

  @get('/loogbooks/{id}/person', {
    responses: {
      '200': {
        description: 'Person belonging to Loogbook',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Person)},
          },
        },
      },
    },
  })
  async getPerson(
    @param.path.string('id') id: typeof Loogbook.prototype.id,
  ): Promise<Person> {
    return this.loogbookRepository.person(id);
  }
}

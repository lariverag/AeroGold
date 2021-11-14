import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Manoeuvre,
  Loogbook,
} from '../models';
import {ManoeuvreRepository} from '../repositories';

export class ManoeuvreLoogbookController {
  constructor(
    @repository(ManoeuvreRepository)
    public manoeuvreRepository: ManoeuvreRepository,
  ) { }

  @get('/manoeuvres/{id}/loogbook', {
    responses: {
      '200': {
        description: 'Loogbook belonging to Manoeuvre',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Loogbook)},
          },
        },
      },
    },
  })
  async getLoogbook(
    @param.path.string('id') id: typeof Manoeuvre.prototype.id,
  ): Promise<Loogbook> {
    return this.manoeuvreRepository.loogbook(id);
  }
}

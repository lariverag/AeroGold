import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Loogbook,
  Manoeuvre,
} from '../models';
import {LoogbookRepository} from '../repositories';

export class LoogbookManoeuvreController {
  constructor(
    @repository(LoogbookRepository) protected loogbookRepository: LoogbookRepository,
  ) { }

  @get('/loogbooks/{id}/manoeuvres', {
    responses: {
      '200': {
        description: 'Array of Loogbook has many Manoeuvre',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Manoeuvre)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Manoeuvre>,
  ): Promise<Manoeuvre[]> {
    return this.loogbookRepository.manoeuvres(id).find(filter);
  }

  @post('/loogbooks/{id}/manoeuvres', {
    responses: {
      '200': {
        description: 'Loogbook model instance',
        content: {'application/json': {schema: getModelSchemaRef(Manoeuvre)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Loogbook.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manoeuvre, {
            title: 'NewManoeuvreInLoogbook',
            exclude: ['id'],
            optional: ['loogbookId']
          }),
        },
      },
    }) manoeuvre: Omit<Manoeuvre, 'id'>,
  ): Promise<Manoeuvre> {
    return this.loogbookRepository.manoeuvres(id).create(manoeuvre);
  }

  @patch('/loogbooks/{id}/manoeuvres', {
    responses: {
      '200': {
        description: 'Loogbook.Manoeuvre PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manoeuvre, {partial: true}),
        },
      },
    })
    manoeuvre: Partial<Manoeuvre>,
    @param.query.object('where', getWhereSchemaFor(Manoeuvre)) where?: Where<Manoeuvre>,
  ): Promise<Count> {
    return this.loogbookRepository.manoeuvres(id).patch(manoeuvre, where);
  }

  @del('/loogbooks/{id}/manoeuvres', {
    responses: {
      '200': {
        description: 'Loogbook.Manoeuvre DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Manoeuvre)) where?: Where<Manoeuvre>,
  ): Promise<Count> {
    return this.loogbookRepository.manoeuvres(id).delete(where);
  }
}

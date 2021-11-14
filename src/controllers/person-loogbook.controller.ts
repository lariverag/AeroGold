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
  Person,
  Loogbook,
} from '../models';
import {PersonRepository} from '../repositories';

export class PersonLoogbookController {
  constructor(
    @repository(PersonRepository) protected personRepository: PersonRepository,
  ) { }

  @get('/people/{id}/loogbook', {
    responses: {
      '200': {
        description: 'Person has one Loogbook',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Loogbook),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Loogbook>,
  ): Promise<Loogbook> {
    return this.personRepository.loogbook(id).get(filter);
  }

  @post('/people/{id}/loogbook', {
    responses: {
      '200': {
        description: 'Person model instance',
        content: {'application/json': {schema: getModelSchemaRef(Loogbook)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Person.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Loogbook, {
            title: 'NewLoogbookInPerson',
            exclude: ['id'],
            optional: ['personId']
          }),
        },
      },
    }) loogbook: Omit<Loogbook, 'id'>,
  ): Promise<Loogbook> {
    return this.personRepository.loogbook(id).create(loogbook);
  }

  @patch('/people/{id}/loogbook', {
    responses: {
      '200': {
        description: 'Person.Loogbook PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Loogbook, {partial: true}),
        },
      },
    })
    loogbook: Partial<Loogbook>,
    @param.query.object('where', getWhereSchemaFor(Loogbook)) where?: Where<Loogbook>,
  ): Promise<Count> {
    return this.personRepository.loogbook(id).patch(loogbook, where);
  }

  @del('/people/{id}/loogbook', {
    responses: {
      '200': {
        description: 'Person.Loogbook DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Loogbook)) where?: Where<Loogbook>,
  ): Promise<Count> {
    return this.personRepository.loogbook(id).delete(where);
  }
}

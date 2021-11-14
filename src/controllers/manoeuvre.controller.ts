import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Manoeuvre} from '../models';
import {ManoeuvreRepository} from '../repositories';

export class ManoeuvreController {
  constructor(
    @repository(ManoeuvreRepository)
    public manoeuvreRepository : ManoeuvreRepository,
  ) {}

  @post('/manoeuvres')
  @response(200, {
    description: 'Manoeuvre model instance',
    content: {'application/json': {schema: getModelSchemaRef(Manoeuvre)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manoeuvre, {
            title: 'NewManoeuvre',
            exclude: ['id'],
          }),
        },
      },
    })
    manoeuvre: Omit<Manoeuvre, 'id'>,
  ): Promise<Manoeuvre> {
    return this.manoeuvreRepository.create(manoeuvre);
  }

  @get('/manoeuvres/count')
  @response(200, {
    description: 'Manoeuvre model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Manoeuvre) where?: Where<Manoeuvre>,
  ): Promise<Count> {
    return this.manoeuvreRepository.count(where);
  }

  @get('/manoeuvres')
  @response(200, {
    description: 'Array of Manoeuvre model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Manoeuvre, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Manoeuvre) filter?: Filter<Manoeuvre>,
  ): Promise<Manoeuvre[]> {
    return this.manoeuvreRepository.find(filter);
  }

  @patch('/manoeuvres')
  @response(200, {
    description: 'Manoeuvre PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manoeuvre, {partial: true}),
        },
      },
    })
    manoeuvre: Manoeuvre,
    @param.where(Manoeuvre) where?: Where<Manoeuvre>,
  ): Promise<Count> {
    return this.manoeuvreRepository.updateAll(manoeuvre, where);
  }

  @get('/manoeuvres/{id}')
  @response(200, {
    description: 'Manoeuvre model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Manoeuvre, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Manoeuvre, {exclude: 'where'}) filter?: FilterExcludingWhere<Manoeuvre>
  ): Promise<Manoeuvre> {
    return this.manoeuvreRepository.findById(id, filter);
  }

  @patch('/manoeuvres/{id}')
  @response(204, {
    description: 'Manoeuvre PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manoeuvre, {partial: true}),
        },
      },
    })
    manoeuvre: Manoeuvre,
  ): Promise<void> {
    await this.manoeuvreRepository.updateById(id, manoeuvre);
  }

  @put('/manoeuvres/{id}')
  @response(204, {
    description: 'Manoeuvre PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() manoeuvre: Manoeuvre,
  ): Promise<void> {
    await this.manoeuvreRepository.replaceById(id, manoeuvre);
  }

  @del('/manoeuvres/{id}')
  @response(204, {
    description: 'Manoeuvre DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.manoeuvreRepository.deleteById(id);
  }
}

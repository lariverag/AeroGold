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
import {Loogbook} from '../models';
import {LoogbookRepository} from '../repositories';

export class LoogbookController {
  constructor(
    @repository(LoogbookRepository)
    public loogbookRepository : LoogbookRepository,
  ) {}

  @post('/loogbooks')
  @response(200, {
    description: 'Loogbook model instance',
    content: {'application/json': {schema: getModelSchemaRef(Loogbook)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Loogbook, {
            title: 'NewLoogbook',
            exclude: ['id'],
          }),
        },
      },
    })
    loogbook: Omit<Loogbook, 'id'>,
  ): Promise<Loogbook> {
    return this.loogbookRepository.create(loogbook);
  }

  @get('/loogbooks/count')
  @response(200, {
    description: 'Loogbook model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Loogbook) where?: Where<Loogbook>,
  ): Promise<Count> {
    return this.loogbookRepository.count(where);
  }

  @get('/loogbooks')
  @response(200, {
    description: 'Array of Loogbook model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Loogbook, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Loogbook) filter?: Filter<Loogbook>,
  ): Promise<Loogbook[]> {
    return this.loogbookRepository.find(filter);
  }

  @patch('/loogbooks')
  @response(200, {
    description: 'Loogbook PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Loogbook, {partial: true}),
        },
      },
    })
    loogbook: Loogbook,
    @param.where(Loogbook) where?: Where<Loogbook>,
  ): Promise<Count> {
    return this.loogbookRepository.updateAll(loogbook, where);
  }

  @get('/loogbooks/{id}')
  @response(200, {
    description: 'Loogbook model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Loogbook, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Loogbook, {exclude: 'where'}) filter?: FilterExcludingWhere<Loogbook>
  ): Promise<Loogbook> {
    return this.loogbookRepository.findById(id, filter);
  }

  @patch('/loogbooks/{id}')
  @response(204, {
    description: 'Loogbook PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Loogbook, {partial: true}),
        },
      },
    })
    loogbook: Loogbook,
  ): Promise<void> {
    await this.loogbookRepository.updateById(id, loogbook);
  }

  @put('/loogbooks/{id}')
  @response(204, {
    description: 'Loogbook PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() loogbook: Loogbook,
  ): Promise<void> {
    await this.loogbookRepository.replaceById(id, loogbook);
  }

  @del('/loogbooks/{id}')
  @response(204, {
    description: 'Loogbook DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.loogbookRepository.deleteById(id);
  }
}

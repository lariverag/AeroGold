import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Person, PersonRelations, Loogbook} from '../models';
import {LoogbookRepository} from './loogbook.repository';

export class PersonRepository extends DefaultCrudRepository<
  Person,
  typeof Person.prototype.id,
  PersonRelations
> {

  public readonly loogbook: HasOneRepositoryFactory<Loogbook, typeof Person.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('LoogbookRepository') protected loogbookRepositoryGetter: Getter<LoogbookRepository>,
  ) {
    super(Person, dataSource);
    this.loogbook = this.createHasOneRepositoryFactoryFor('loogbook', loogbookRepositoryGetter);
    this.registerInclusionResolver('loogbook', this.loogbook.inclusionResolver);
  }
}

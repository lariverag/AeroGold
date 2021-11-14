import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Loogbook, LoogbookRelations, Person, Manoeuvre} from '../models';
import {PersonRepository} from './person.repository';
import {ManoeuvreRepository} from './manoeuvre.repository';

export class LoogbookRepository extends DefaultCrudRepository<
  Loogbook,
  typeof Loogbook.prototype.id,
  LoogbookRelations
> {

  public readonly person: BelongsToAccessor<Person, typeof Loogbook.prototype.id>;

  public readonly manoeuvres: HasManyRepositoryFactory<Manoeuvre, typeof Loogbook.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonRepository') protected personRepositoryGetter: Getter<PersonRepository>, @repository.getter('ManoeuvreRepository') protected manoeuvreRepositoryGetter: Getter<ManoeuvreRepository>,
  ) {
    super(Loogbook, dataSource);
    this.manoeuvres = this.createHasManyRepositoryFactoryFor('manoeuvres', manoeuvreRepositoryGetter,);
    this.registerInclusionResolver('manoeuvres', this.manoeuvres.inclusionResolver);
    this.person = this.createBelongsToAccessorFor('person', personRepositoryGetter,);
    this.registerInclusionResolver('person', this.person.inclusionResolver);
  }
}

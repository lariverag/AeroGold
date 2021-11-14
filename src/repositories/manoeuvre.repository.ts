import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Manoeuvre, ManoeuvreRelations, Loogbook} from '../models';
import {LoogbookRepository} from './loogbook.repository';

export class ManoeuvreRepository extends DefaultCrudRepository<
  Manoeuvre,
  typeof Manoeuvre.prototype.id,
  ManoeuvreRelations
> {

  public readonly loogbook: BelongsToAccessor<Loogbook, typeof Manoeuvre.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('LoogbookRepository') protected loogbookRepositoryGetter: Getter<LoogbookRepository>,
  ) {
    super(Manoeuvre, dataSource);
    this.loogbook = this.createBelongsToAccessorFor('loogbook', loogbookRepositoryGetter,);
    this.registerInclusionResolver('loogbook', this.loogbook.inclusionResolver);
  }
}

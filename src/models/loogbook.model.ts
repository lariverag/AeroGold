import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Person} from './person.model';
import {Manoeuvre} from './manoeuvre.model';

@model()
export class Loogbook extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  manoeuvre: string;

  @property({
    type: 'string',
    required: true,
  })
  model_aircraft: string;

  @property({
    type: 'string',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  location: string;

  @belongsTo(() => Person)
  personId: string;

  @hasMany(() => Manoeuvre)
  manoeuvres: Manoeuvre[];

  constructor(data?: Partial<Loogbook>) {
    super(data);
  }
}

export interface LoogbookRelations {
  // describe navigational properties here
}

export type LoogbookWithRelations = Loogbook & LoogbookRelations;

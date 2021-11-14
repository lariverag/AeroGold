import {Entity, model, property, hasOne} from '@loopback/repository';
import {Loogbook} from './loogbook.model';

@model()
export class Person extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  document_type: string;

  @property({
    type: 'number',
    required: true,
  })
  document: number;

  @property({
    type: 'string',
    required: true,
  })
  position: string;

  @hasOne(() => Loogbook)
  loogbook: Loogbook;

  constructor(data?: Partial<Person>) {
    super(data);
  }
}

export interface PersonRelations {
  // describe navigational properties here
}

export type PersonWithRelations = Person & PersonRelations;

import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Loogbook} from './loogbook.model';

@model()
export class Manoeuvre extends Entity {
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
  duration: string;

  @property({
    type: 'number',
    required: true,
  })
  frecuency: number;

  @belongsTo(() => Loogbook)
  loogbookId: string;

  constructor(data?: Partial<Manoeuvre>) {
    super(data);
  }
}

export interface ManoeuvreRelations {
  // describe navigational properties here
}

export type ManoeuvreWithRelations = Manoeuvre & ManoeuvreRelations;

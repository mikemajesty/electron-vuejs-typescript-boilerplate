import { ZodSchema, ZodType } from 'zod';
import { v4 as uuidv4 } from 'uuid';

const withID = (entity: { id?: string }) => {
  Object.assign(entity, { id: [entity?.id, uuidv4()].find(Boolean) });
  return entity;
};

export interface IEntity {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt?: Date;
}

export const BaseEntity = <T>(schema: ZodSchema) => {
  abstract class Entity implements IEntity {
    readonly id!: string;

    readonly createdAt!: Date;

    readonly updatedAt!: Date;

    deletedAt?: Date;

    static nameof = (name: keyof T) => name;

    setDeleted() {
      this.deletedAt = new Date();
    }

    validate<TValidate>(entity: Partial<TValidate>): ZodType {
      Object.assign(entity, withID(entity));
      Object.assign(this, { id: (entity as unknown as IEntity).id });
      return schema.parse(entity);
    }
  }

  return Entity;
};
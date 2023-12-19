import { Knex } from "knex";
import { IRepository } from "./adapter";
import { PaginationInput, PaginationOutput } from "@/electron/utils/pagination";

export type RepositoryLoadType = {
  tableName: string;
  instance: Knex;
};

export class Repository<T> implements IRepository<T> {
  constructor(readonly parameters: RepositoryLoadType) {}

  async create(model: Partial<T>): Promise<T | null> {
    const created = await this.parameters
      .instance(this.parameters.tableName)
      .insert(model, "*");

    if (created.length) {
      return created[0];
    }

    return null;
  }

  async update(filter: Partial<T>, model: Partial<T>): Promise<T | null> {
    const updated = await this.parameters
      .instance(this.parameters.tableName)
      .where(filter)
      .update(model, "*")
      .first();

    if (updated.length) {
      return updated[0];
    }

    return null;
  }

  async remove(filter: Partial<T>): Promise<number> {
    return this.parameters
      .instance(this.parameters.tableName)
      .where(filter)
      .delete();
  }

  async find(filter?: Partial<T>): Promise<T[]> {
    if (filter) {
      return this.parameters
        .instance(this.parameters.tableName)
        .where(filter)
        .select("*");
    }

    return this.parameters.instance(this.parameters.tableName).select("*");
  }

  async findOne(filter?: Partial<T>): Promise<T> {
    return this.parameters
      .instance(this.parameters.tableName)
      .where(filter as Partial<T>)
      .select("*")
      .first() as T;
  }

  async paginate(input: PaginationInput): Promise<PaginationOutput<T>> {
    const products = await this.parameters
      .instance(this.parameters.tableName)
      .paginate({
        perPage: input.limit,
        currentPage: input.page,
      });

    const count: { total: number } = await this.parameters
      .instance(this.parameters.tableName)
      .count("*", { as: "total" });

    return {
      docs: products.data,
      page: products.pagination.currentPage,
      limit: products.pagination.perPage,
      currentPage: products.pagination.currentPage,
      total: count[0].total,
      from: products.pagination.from,
      to: products.pagination.to,
    };
  }
}

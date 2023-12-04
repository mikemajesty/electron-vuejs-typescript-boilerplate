import { PaginationInput, PaginationOutput } from "@/electron/utils/pagination";

export abstract class IRepository<T> {
  abstract create(model: Partial<T>): Promise<T | null>;

  abstract update(filter: Partial<T>, model: Partial<T>): Promise<T | null>;

  abstract remove(filter: Partial<T>): Promise<number>;

  abstract find(filter?: Partial<T>): Promise<T[]>;

  abstract findOne(filter?: Partial<T>): Promise<T>;

  abstract paginate(input: PaginationInput): Promise<PaginationOutput<T>>;
}

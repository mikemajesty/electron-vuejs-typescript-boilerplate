import { IpcMainEvent, Notification } from "electron";
import {
  ProductDeleteInput,
  ProductDeleteOutput,
  ProductDeleteUsecase,
} from "@/electron/core/product/use-cases/delete-product";
import {
  ProductListInput,
  ProductListOutput,
  ProductListUsecase,
} from "@/electron/core/product/use-cases/list-product";
import {
  ProductUpdateInput,
  ProductUpdateOutput,
  ProductUpdateUsecase,
} from "@/electron/core/product/use-cases/update-product";
import {
  ProductCreateInput,
  ProductCreateOutput,
  ProductCreateUsecase,
} from "@/electron/core/product/use-cases/create-product";
import { ProductRepository } from "./repository";

// const repository: ProductRepository = new ProductRepository();

export class ProductController {
  constructor(private readonly repository: ProductRepository) {}

  async create(
    _event: IpcMainEvent,
    input: ProductCreateInput,
  ): Promise<ProductCreateOutput> {
    console.log("------------------");
    const createUsecase = new ProductCreateUsecase(this.repository);
    const response = await createUsecase.execute(input);
    new Notification({
      title: "Product Created",
      body: `Produto ${response?.name}: criado com sucesso!`,
    }).show();
    return response;
  }

  async delete(
    _event: IpcMainEvent,
    input: ProductDeleteInput,
  ): Promise<ProductDeleteOutput> {
    const response = await new ProductDeleteUsecase(this.repository).execute(
      input,
    );
    new Notification({
      title: "Product Deleted",
      body: `Produto ${response.name}: deletado com sucesso.`,
    }).show();
    return response;
  }

  async update(
    _event: IpcMainEvent,
    input: ProductUpdateInput,
  ): Promise<ProductUpdateOutput> {
    const response = await new ProductUpdateUsecase(this.repository).execute(
      input,
    );
    new Notification({
      title: "Product Updated",
      body: `Produto ${response?.name}: alterado com sucesso.`,
    }).show();
    return response;
  }

  async list(
    _event: IpcMainEvent,
    input: ProductListInput,
  ): Promise<ProductListOutput> {
    const response = await new ProductListUsecase(this.repository).execute(
      input,
    );
    return response;
  }
}

// const ProductController = new Controller();
// export { ProductController };

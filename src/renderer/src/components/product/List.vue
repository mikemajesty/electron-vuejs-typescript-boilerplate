<script lang="ts">
import { AppWindow } from "../../types";
import Pagination from "../pagination/pagination.vue";

export default {
  name: "ListProduct",
  components: {
    Pagination,
  },
  data() {
    const products: { name: string; price: number; description: string }[] = [];
    const pagination: {
      page?: number;
      limit?: number;
      total?: number;
      currentPage?: number;
      from?: number;
      to?: number;
    } = {};
    return { products, pagination };
  },
  async mounted() {
    const products = await AppWindow.electron.ipcRenderer.invoke(
      "listProduct",
      { limit: 10, page: 1, sort: { createdAt: -1 } },
    );
    this.products = products.docs;
    this.pagination = {
      page: products.page,
      limit: products.limit,
      total: products.total,
      currentPage: products.currentPage,
      from: products.from,
      to: products.to,
    };
  },
  methods: {
    async list(page?: number) {
      const products = await AppWindow.electron.ipcRenderer.invoke(
        "listProduct",
        { limit: 10, page: page, sort: { createdAt: -1 } },
      );

      this.products = products.docs;
      this.pagination = {
        page: products.page as number,
        limit: products.limit as number,
        total: products.total,
        currentPage: products.currentPage,
        from: products.from,
        to: products.to,
      };
    },
  },
};
</script>

<template>
  <div class="listProduct">
    <h1 class="title is-1">Lista de Produtos</h1>
    <div class="title is-5">{{ pagination }}</div>
    <div class="columns">
      <div class="column is-bordered">
        <table class="table is-bordered">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody v-for="(product, index) in products" :key="index">
            <tr>
              <td>{{ product.name }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <Pagination
    :options="{ ...pagination }"
    @paginate-next="list(Number(pagination?.page) + 1)"
    @paginate-previous="list(Number(pagination?.page) - 1)"
  ></Pagination>
</template>

<style scoped>
.listProduct {
  padding-left: 1%;
  padding-right: 1%;
  padding-top: 1%;
  padding-bottom: 0%;
  margin-bottom: 0%;
}
table {
  width: 100%;
}
td {
  max-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
td:before {
  content: attr(title);
}
</style>

<script lang="ts">
import { AppWindow } from "../../types";

export default {
  name: "ListProduct",
  components: {},
  data() {
    const products: { name: string; price: number; description: string }[] = [];
    return { products, pagination: {} };
  },
  async mounted() {
    const products = await AppWindow.electron.ipcRenderer.invoke("listProduct");
    this.products = products.docs;
    this.pagination = {
      page: products.page,
      limit: products.limit,
      total: products.total,
    };
  },
  methods: {},
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
          <tbody
            v-for="product in products"
            :key="product.name + product.description"
          >
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
</template>

<style scoped>
.listProduct {
  padding-left: 1%;
  padding-right: 1%;
  padding-top: 1%;
  padding-bottom: 1%;
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

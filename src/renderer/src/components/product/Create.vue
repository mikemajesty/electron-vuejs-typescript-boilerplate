<script lang="ts">
import { AppWindow } from "../../types";

export default {
  name: "CreateProduct",
  data() {
    return {
      name: undefined,
      description: undefined,
      price: undefined,
    };
  },
  methods: {
    createProduct() {
      AppWindow.electron.ipcRenderer.send("createProduct", {
        name: this.name,
        price: this.price,
        description: this.description,
      });
    },
  },
};
</script>

<template>
  <div class="createProduct">
    <form id="productCreate" @submit.prevent="createProduct">
      <h1 class="title is-1">Cadastro de Produtos</h1>
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Nome</label>
            <div class="control">
              <input
                id="productName"
                v-model="name"
                class="input"
                type="text"
                placeholder="Nome do Produto"
              />
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Preço</label>
            <div class="control">
              <input
                id="productPrice"
                v-model="price"
                class="input"
                type="number"
                placeholder="Preço do Produto"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Descrição</label>
            <div class="control">
              <textarea
                id="productDescription"
                v-model="description"
                class="textarea"
                placeholder="Descrição do Produto"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-grouped">
        <p class="control">
          <button class="button is-primary" type="submit">Cadastrar</button>
        </p>
        <p class="control">
          <button class="button is-light">Cancelar</button>
        </p>
      </div>
    </form>

    <div class="columns">
      <div class="column">
        <div id="productList"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

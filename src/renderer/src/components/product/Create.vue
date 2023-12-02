<script lang="ts">
import { onMounted, ref } from "vue";
import { AppWindow } from "../../types";
import CurrencyInput from "../input/Currency.vue";
import { nextTick } from "process";

export default {
  name: "CreateProduct",
  components: {
    CurrencyInput,
  },
  props: {
    name: String,
    description: String,
    price: Number,
  },
  setup() {
    const nameInput = ref();
    const productPrice = ref();

    onMounted(() => {
      productPrice.value = 0;
      nextTick(() => {
        nameInput.value.focus();
      });
    });

    return {
      nameInput,
      productPrice,
    };
  },
  data() {
    return {
      productName: this.name,
      productDescription: this.description,
    };
  },
  methods: {
    createProduct() {
      AppWindow.electron.ipcRenderer.send("createProduct", {
        name: this.productName,
        price: this.productPrice,
        description: this.productDescription,
      });

      this.cancel();
    },
    cancel() {
      this.cleanInput();
      this.postSave();
    },
    postSave() {
      (
        (this.$refs as { priceInput: { inputRef: unknown } }).priceInput
          .inputRef as HTMLInputElement
      ).value = "R$0";
      (this.$refs.nameInput as HTMLInputElement).focus();
    },
    cleanInput() {
      this.productName = "";
      this.productPrice = 0;
      this.productDescription = "";
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
                ref="nameInput"
                v-model="productName"
                required
                tabindex="0"
                maxlength="400"
                class="input"
                :min="0"
                type="text"
                placeholder="Nome do Produto"
              />
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Preço</label>
            <div class="control productPrice">
              <CurrencyInput
                id="productPrice"
                ref="priceInput"
                v-model="productPrice"
                required
                tabindex="1"
                class="input"
                :options="{ currency: 'BRL', allowNegative: false }"
              ></CurrencyInput>
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
                v-model="productDescription"
                tabindex="2"
                required
                maxlength="400"
                class="textarea"
                placeholder="Descrição do Produto"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-grouped">
        <p class="control">
          <button class="button is-primary" tabindex="3" type="submit">
            Cadastrar
          </button>
        </p>
        <p class="control">
          <button class="button is-light" tabindex="4" @click.prevent="cancel">
            Cancelar
          </button>
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

<style scoped>
.createProduct {
  padding-left: 1%;
  padding-right: 1%;
  padding-top: 1%;
  padding-bottom: 1%;
}
</style>

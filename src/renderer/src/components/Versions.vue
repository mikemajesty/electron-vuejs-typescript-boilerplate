<script lang="ts">
import { AppWindow } from "../types";
import { reactive } from "vue";

const versions = reactive({
  ...AppWindow.electron.process.versions,
});

export default {
  data() {
    return { versions };
  },
  methods: {
    createProduct(_e: Event) {
      window.electron.ipcRenderer.send("insert", { name: "MIKE" });
    },
  },
};
</script>

<template>
  <ul class="versions">
    <li class="electron-version">Electron v{{ versions.electron }}</li>
    <li class="chrome-version">Chromium v{{ versions.chrome }}</li>
    <li class="node-version">Node v{{ versions.node }}</li>
    <li class="v8-version">V8 v{{ versions.v8 }}</li>
  </ul>
  <button @click="createProduct">MIKE</button>
</template>

<style scoped>
.versions {
  padding-top: 5%;
}
</style>

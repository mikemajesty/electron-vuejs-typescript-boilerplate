<script lang="ts">
import { AppWindow } from "../types";
import { reactive } from "vue";

const versions = reactive({
  ...AppWindow.electron.process.versions,
});

export default {
  data() {
    return { versions, appVersion: AppWindow.appVersion };
  },
  methods: {
    createProduct() {
      AppWindow.electron.ipcRenderer.send("insert", {
        name: "must to save",
        price: 10,
        description: "ola mundo",
      });
    },
  },
};
</script>

<template>
  <ul class="versions">
    <li class="app-version">App v{{ appVersion }}</li>
    <li class="electron-version">Electron v{{ versions.electron }}</li>
    <li class="chrome-version">Chromium v{{ versions.chrome }}</li>
    <li class="node-version">Node v{{ versions.node }}</li>
    <li class="v8-version">V8 v{{ versions.v8 }}</li>
  </ul>
</template>

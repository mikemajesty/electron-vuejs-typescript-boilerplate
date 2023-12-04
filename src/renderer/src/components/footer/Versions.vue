<script lang="ts">
import { AppWindow } from "../../types";
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
  <footer class="has-text-centered is-flex-align-items-flex-end mt-auto">
    <ul class="versions">
      <div class="columns">
        <div class="column">
          <li class="app-version">App v{{ appVersion }}</li>
        </div>
        <div class="column">
          <li class="electron-version">Electron v{{ versions.electron }}</li>
        </div>
        <div class="column">
          <li class="chrome-version">Chromium v{{ versions.chrome }}</li>
        </div>
        <div class="column">
          <li class="node-version">Node v{{ versions.node }}</li>
        </div>
        <div class="column">
          <li class="v8-version">V8 v{{ versions.v8 }}</li>
        </div>
      </div>
    </ul>
  </footer>
</template>
<style scoped>
.columns {
  margin-top: 0rem !important;
  padding: 0rem !important;
}

.columns:last-child {
  margin-bottom: 0rem !important;
}
</style>

<script lang="ts">
import { reactive } from "vue";

const versions = reactive({
  ...(window as Window).electron.process.versions,
});
export default {
  data() {
    return { versions };
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
</template>

<style scoped>
.versions {
  padding-top: 5%;
}
</style>

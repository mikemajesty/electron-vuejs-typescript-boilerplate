<script lang="ts">
import { CurrencyInputOptions, useCurrencyInput } from "vue-currency-input";

export default {
  name: "CurrencyInput",
  props: {
    modelValue: Number,
    options: Object,
  },
  setup(props) {
    const { inputRef } = useCurrencyInput(
      props.options as CurrencyInputOptions,
    );

    return { inputRef };
  },
};
</script>

<template>
  <input ref="inputRef" type="text" />
</template>

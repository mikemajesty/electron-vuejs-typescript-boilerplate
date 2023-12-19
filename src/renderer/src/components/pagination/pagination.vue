<script lang="ts">
export default {
  props: {
    options: Object,
  },
  emits: ["paginateNext", "paginatePrevious"],
  setup(props) {
    return { props };
  },
  methods: {
    createRange(length = 0, limit = 10) {
      const paginate = Math.trunc(length / limit + (limit > 0 ? 1 : 0));

      const total = Array.from(
        { length: (paginate - 1) / 1 + 1 },
        (_value, index) => 1 + index * 1,
      );

      return total;
    },
    isLastPage(total = 0, limit = 10, page: number) {
      return page === Math.trunc(total / limit + (limit > 0 ? 1 : 0));
    },
    getLastPage(total = 0, limit = 10) {
      return Math.trunc(total / limit + (limit > 0 ? 1 : 0));
    },
    list(page: number) {
      this.$parent?.list(page);
    },
  },
};
</script>

<template>
  <nav class="pagination is-small" role="navigation" aria-label="pagination">
    <div class="column has-text-left">
      <button
        class="pagination-previous"
        :disabled="options?.currentPage === 1"
        @click="$emit('paginatePrevious', 1)"
      >
        Anterior
      </button>
    </div>
    <div class="column page-black">
      <span
        ><span>{{ options?.currentPage }}</span> de
        {{ getLastPage(options?.total, options?.limit) }}</span
      >
    </div>
    <div class="column has-text-right">
      <button
        class="pagination-next"
        :disabled="
          isLastPage(options?.total, options?.limit, options?.currentPage)
        "
        @click="$emit('paginateNext', 1)"
      >
        Proximo
      </button>
    </div>
  </nav>
</template>
<style scoped>
a {
  background-color: white;
}
.pagination-link {
  margin-top: 5px;
}

.pagination-previous {
  width: 50%;
}

.pagination-next {
  width: 50%;
}

.page-black {
  font-size: 1rem;
  color: black;
}
</style>

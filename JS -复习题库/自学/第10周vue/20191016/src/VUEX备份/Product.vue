<template>
  <div>{{name}}</div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import * as types from "./store/store-types";
let { mapState, mapMutations } = createNamespacedHelpers("Product");

export default {
  computed: {
    ...mapState(["name"])
  },
  methods: {
    ...mapMutations([types.PRODUCT_MUTATION_CHANGE_NAME])
  },
  mounted() {
    setTimeout(() => {
      this[types.PRODUCT_MUTATION_CHANGE_NAME]("珠峰架构课，面向阿里P6");
    }, 1000);
  }
};
</script>
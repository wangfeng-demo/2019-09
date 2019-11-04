<template>
  <div id="app">
    <person></person>
    <product></product>
  </div>
</template>

<script>
import Person from "./Person";
import Product from "./Product";
export default {
  name: "app",
  components: {
    Person,
    Product
  },
  data() {
    return {};
  }
};
</script>
<template>
  <div id="app">
    <tab :n="n" :m="m" @click="handle" v-if="flag"></tab>
    <p v-text="text"></p>
  </div>
</template>

<script>
import Tab from "./components/Tab";
export default {
  name: "app",
  data() {
    return {
      text: "哈哈哈",
      n: 10,
      m: 20,
      flag: true
    };
  },
  components: {
    Tab
  },
  methods: {
    handle() {
      this.text = "呵呵呵";
    }
  },
  mounted() {
    setTimeout(_ => {
      this.flag = false;
      this.text = "嘻嘻嘻";
      this.n = 100;
      this.m = 200;
      this.$nextTick(_ => {
        this.flag = true;
      });
    }, 1000);
  }
};
</script>
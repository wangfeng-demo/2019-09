<template>
  <div>
    <temp2 :n="n" :m="m"></temp2>
  </div>
</template>

<script>
import Temp2 from "./Temp2";
export default {
  components: {
    Temp2
  },
  data() {
    return {
      n: 0,
      m: 0
    };
  },
  mounted() {
    setTimeout(() => {
      //=> 父beforeUpdate ->子beforeUpdate ->子updated ->父updated
      this.n = 100;
      this.m = 200;
    }, 1000);
  }
};
</script>
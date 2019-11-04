<template>
  <div class="voteFooter">
    <button type="button" class="btn btn-success" @click="supHandle(10)">支持</button>
    <button type="button" class="btn btn-danger" @click="oppHandle()">反对</button>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    /* supHandle(count) {
      this.$store.commit("supHandle", count);
    }, */
    ...mapMutations(["supHandle"]),
    ...mapActions({
      oppHandle: "opposeAction"
    })
    /* oppHandle() {
      this.$store.dispatch("opposeAction");
    } */
  }
};
</script>
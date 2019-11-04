<template>
  <div>{{queryBase}} ==== {{name}}</div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
let { mapState, mapMutations, mapGetters } = createNamespacedHelpers("Person");
//=>mapState('Person')

export default {
  computed: {
    /* ...mapState({
      name: state => {
        //state:全局的
        return state.Person.name;
      }
	}) */
    /* ...mapState("Person", {
      name: state => {
        //state:通过第一个参数的指定，我们本初的state知识Person板块下的
        return state.name;
      }
	}) */
    ...mapState(["name"]),
    ...mapGetters(["queryBase"])
  },
  methods: {
    ...mapMutations(["changeName", "changeBase"])
  },
  mounted() {
    //=>我们调取mutations中方法的时候，第二个参数是payload，是需要传递给方法的参数信息（只能一个，如果需要传递多个值，我们需要传递一个对象）
    // this.$store.dispatch("Person/actionDemo", "周啸天");
    setTimeout(() => {
      this.changeName("周啸天");
    }, 1000);
  }
};
</script>
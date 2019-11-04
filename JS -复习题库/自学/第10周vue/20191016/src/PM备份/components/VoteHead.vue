<style scoped>
span {
  font-size: 20px;
}
</style>

<template>
  <div class="voteHead">
    <h4>
      {{title}}
      <span>人数：{{total}}</span>
    </h4>
  </div>
</template>

<script>
export default {
  computed: {
    total() {
      return (
        this.$store.state.voteList.supNum + this.$store.state.voteList.oppNum
      );
    }
  },
  data() {
    return {
      //=>把公共状态信息获取到，赋值给当前组件自己的私有状态
      title: this.$store.state.voteList.title
    };
  }
};
</script>
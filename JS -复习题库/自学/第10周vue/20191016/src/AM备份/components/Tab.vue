<template>
  <div>
    <h2 v-text="msg" @click="this.$listeners.click"></h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "李园园是个坏人~~"
    };
  },
  created() {
    //=>$attrs：获取的是父组件传递进来的属性信息（排除掉在PROPS中注册过的，排除CLASS/STYLE等） 都是基于v-bind绑定的属性或者直接静态属性
    //=>$listeners：获取的是父组件传递进来的事件信息  基于@xxx='xxx'处理的
    console.log(this.$attrs, this.$listeners);
  }
};
</script>
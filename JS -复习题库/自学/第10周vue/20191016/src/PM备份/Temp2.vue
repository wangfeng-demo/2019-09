<template>
  <div>{{n}}===={{m}}</div>
</template>

<script>
export default {
  //=>只要父组件重现渲染子组件，就会把最新的属性传递进来
  props: ["n", "m"],
  //=>子组件重新渲染的时候data函数不会再执行（只有第一次渲染子组件，在beforeCreate和created中间的时候执行一次）
  methods: {
    AA() {
      return this.n;
    }
  },
  computed: {
    BB() {
      return this.m;
    }
  },
  data() {
    return {
      //   AA: this.n,
      //   BB: this.m
    };
  }
};
</script>
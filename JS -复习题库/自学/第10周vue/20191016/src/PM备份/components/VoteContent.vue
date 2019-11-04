<template>
  <div class="voteContent">
    <p>
      支持人数：
      <span>{{supNum}}</span>
    </p>
    <p>
      反对人数：
      <span>{{oppNum}}</span>
    </p>
    <p>
      支持率：
      <span>{{ratio}}</span>
    </p>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
/*
 * 遍历STORE容器中的STATE：获取到的结果是一个新的对象
 *    mapState(["voteList", "message"])  =>{voteList:xxx,message:xxx}
 */
/* console.log(
  mapState({
    //=>state:this.$store.state
    supNum: state => state.voteList.supNum,
    oppNum: state => state.voteList.oppNum
  })
);  =>{supNum:function xxx,oppNum:function xxx}*/

export default {
  computed: {
    ...mapState({
      supNum: state => state.voteList.supNum,
      oppNum: state => state.voteList.oppNum
    }),
    ...mapGetters(["ratio"])
  },
  data() {
    return {};
  }
};
</script>
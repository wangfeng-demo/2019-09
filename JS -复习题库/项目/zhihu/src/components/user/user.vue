<template>
  <div>
    <header>
      <input type="text" />
      <span>扫描</span>
      <span @click="change">{{loginState?'退出':'登录'}}
          <van-icon name="setting-o" />
      </span>
    </header>
    <in v-if="loginState"></in>
    <un-in v-else></un-in>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import In from './in'
import Unin from './unin'
// @ is an alias to /src
export default {
    name: 'user',
    data() {
        return {
        
        }
    },
    components: {
        in:In,
        'un-in':Unin
    },

    computed: {
        ...mapState(['loginState'])
    },
    methods:{
        change(){
            if(this.loginState){
                //当前是登录 需要退出
                localStorage.removeItem('token')
                this.$store.commit('stateChange',{'loginState':false})
            }else{
                //当前未登录 需要登陆
                this.$router.push('/login')
            }
        }
    }
}
</script>
<style lang="less">
</style>
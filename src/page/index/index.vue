<template>
  <div
    :class="{'avue--collapse':isCollapse}"
    class="avue-contail">
    <div class="avue-header">
      <!-- 顶部导航栏 -->
      <top/>
    </div>

    <div class="avue-layout">
      <div class="avue-left">
        <!-- 左侧导航栏 -->
        <sidebar/>
      </div>
      <div class="avue-main">
        <!-- 顶部标签卡 -->
        <tags/>
        <!-- 主体视图层 -->
        <div style="height:100%;overflow-y:auto;overflow-x:hidden;"
             id="avue-view">
          <keep-alive>
            <router-view class="avue-view"
                         v-if="$route.meta.keepAlive"/>
          </keep-alive>
          <router-view class="avue-view"
                       v-if="!$route.meta.keepAlive"/>
        </div>
      </div>
    </div>
    <div
      class="avue-shade"
      @click="showCollapse"/>
    <global-web-socket uri="/act/ws/info" v-if="website.websocket"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import tags from './tags'
import top from './top/'
import sidebar from './sidebar/'
import {checkToken} from '@/api/login'
import {calcScreen} from '@/util'
import GlobalWebSocket from '@/components/WebSocket/GlobalWebSocket'


export default {
  name: 'Index',
  provide() {
    return {
      Index: this
    };
  },
  components: {
    top,
    tags,
    sidebar,
    GlobalWebSocket
  },
  data() {
    return {
      // 刷新token锁
      refreshLock: false,
      // 刷新token的时间
      refreshTime: '',
      // 计时器
      timer: ''
    }
  },
  created() {
    // 实时检测刷新token
    this.refreshToken()
  },
  destroyed() {
    clearInterval(this.refreshTime)
    clearInterval(this.timer)
  },
  mounted() {
    this.initWindow()
  },
  computed: mapGetters(['userInfo', 'isLock', 'isCollapse', 'website']),
  methods: {
    showCollapse() {
      this.$store.commit('SET_COLLAPSE')
    },
    openMenu(item = {}) {
      this.$store.dispatch("GetMenu", {type: true, id: item.id}).then(data => {
        if (data.length !== 0) {
          this.$router.$avueRouter.formatRoutes(data, true);
        }
      });
    },
    // 屏幕检测
    initWindow() {
      this.$store.commit('SET_SCREEN', calcScreen())
      window.onresize = () => {
        setTimeout(() => {
          this.$store.commit('SET_SCREEN', calcScreen())
        }, 0)
      }
    },
    // 实时检测刷新token
    refreshToken() {
      this.refreshTime = setInterval(() => {
        checkToken(this.refreshLock, this.$store)
      }, 60000)
    }
  }
}
</script>

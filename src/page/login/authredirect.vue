<template>
  <div/>
</template>

<script>
import request from '@/router/axios'
import {getQueryString} from '@/util'
import {mapGetters} from 'vuex'
import {validatenull} from "@/util/validate";

export default {
  name: 'Authredirect',
  computed: {
    ...mapGetters(['tagWel'])
  },
  created() {
    const url = window.location.search
      .replace('#/authredirect', '')
      .replaceAll('/', '')

    // 优先获取 code 参数，获取不到 则换成 ticket
    let code = getQueryString(url, 'code')
    if (validatenull(code)) {
      code = getQueryString(url, 'ticket')
    }

    //  分割登录参数
    let state = getQueryString(url, 'state')
    let type = state.split('-')[1]
    state = state.split('-')[0]

    // 登录请求
    if (type === 'LOGIN') {
      let opener = window.opener || window
      opener.location.href = `${window.location.origin}/#/login?state=${state}&code=${code}&time=` + new Date().getTime()
      window.close()
    } else {
      this.bind(state, code)
    }
  },
  methods: {
    bind: function (state, code) {
      request({
        url: '/admin/social/bind',
        method: 'post',
        params: {state, code}
      }).then(() => {
        this.$alert('社交账号绑定成功', '成功', {
          confirmButtonText: '确定',
          callback: () => {
            window.close()
          }
        })
      })
    }
  }
}
</script>

<style>
</style>

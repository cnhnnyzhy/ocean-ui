<template>
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane v-for="item in data" :key="item.k" :lazy="true" :label="item.k" :name="item.k">
      <Java id="target" :value="item.v" height="600px"/>
      <el-button
        id="btn" @click="copyLink(item.v)"
        type="text"
        size="small"
        icon="el-icon-document-copy" class="copy">
        复制
      </el-button>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Java from '@/components/editor/index'
import {preview} from '@/api/gen/gen'
import Clipboard from "clipboard";

export default {
  name: 'Preview',
  components: {Java},
  props: {
    queryData: {}
  },
  data() {
    return {
      data: [], height: '', activeName: 'Entity.java'
    }
  },
  created() {
    preview(this.queryData).then(res => {
      let map = res.data.data

      for (let key in map) {
        let k = key.replace(/^template\/|.vm$/g, '')
        let v = map[key]
        let obj = {k, v}
        this.data.push(obj)
      }
    })
  },
  methods: {
    copyLink(value) {
      const clipboard = new Clipboard('#btn', {text: () => value})
      // 复制成功执行的回调
      clipboard.on('success', () => {
        this.$message.success('复制成功')
      })
    }
  }
}
</script>

<style scoped>
.copy {
  position: absolute;
  right: 10vh;
  top: 20px;
}
</style>

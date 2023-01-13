<template>
  <div class="login-container">
    <div class="login-weaper animated bounceInDown">
      <div class="login-logo">
        <img src="/img/logo.png" alt=""/>
      </div>
      <p class="login-tip">{{ website.title }} v 4.5</p>
      <div class="login-border">
        <div class="login-main">
          <h4 class="login-title" v-if="!website.domainAutoTenant">
            <el-select
              v-model="active"
              class="login-select animated fadeIn"
              placeholder="点击请选择租户"
              @change="handleCommand"
            >
              <el-option
                v-for="tenant in tenantList"
                :key="tenant.id"
                :label="tenant.name"
                :value="tenant.id"
              ></el-option>
            </el-select>
          </h4>
          <userLogin v-if="activeName === 'user'"/>
          <codeLogin v-else-if="activeName === 'code'"/>
          <thirdLogin v-else-if="activeName === 'third'"/>
          <user-register v-else-if="activeName==='register'" @ok="activeName='user'"/>
          <div class="login-menu">
            <a href="#" @click.stop="activeName = 'user'">账号密码</a>
            <a href="#" @click.stop="activeName = 'code'">手机号登录</a>
            <a href="#" @click.stop="activeName = 'third'">第三方登录</a>
            <a href="#" v-if="website.register" @click.stop="activeName = 'register'">用户注册</a>
          </div>
        </div>
      </div>
    </div>
    <div class="login-copyright">
      {{ website.copyright }}
    </div>
    <div class='mini_qr' id="kefu">
      <img width="120px" height="120px"
        src='https://minio.pigx.vip/oss/1660985559.png'>
      <p>微信扫码体验移动端</p>
    </div>
    <top-color v-show="false"/>
  </div>
</template>
<script>
import {fetchList} from "@/api/admin/tenant";
import userLogin from "./userlogin";
import codeLogin from "./codelogin";
import thirdLogin from "./thirdlogin";
import {mapGetters} from "vuex";
import {getStore, setStore} from "@/util/store";
import topColor from "@/page/index/top/top-color";
import website from "@/const/website";
import userRegister from "@/page/login/userRegister";

export default {
  name: "Login",
  components: {
    userLogin,
    codeLogin,
    thirdLogin,
    topColor,
    userRegister
  },
  data() {
    return {
      active: "",
      tenantList: [],
      activeName: "user",
      socialForm: {},
    };
  },
  watch: {
    $route: {
      handler() {
        const params = this.$route.query;
        if (this.validatenull(params.state) && this.validatenull(params.code))
          return;

        this.socialForm.state = params.state;
        this.socialForm.code = params.code;

        const loading = this.$loading({
          lock: true,
          text: `登录中,请稍后。。。`,
          spinner: "el-icon-loading",
        });

        this.$store
          .dispatch("LoginBySocial", this.socialForm)
          .then(() => {
            loading.close();
            this.$router.push({path: this.tagWel.value});
          })
          .catch(() => {
            loading.close();
          });
      },
      immediate: true,
    },
  },
  created() {
    this.active = getStore({name: "tenantId"});

    this.getTenantList().then(() => {
      // 开启自动租户填充
      if (website.domainAutoTenant) {
        this.handleAutoTenant()
      }
    })
  },
  computed: {
    ...mapGetters(["website", "tagWel"]),
  },
  methods: {
    handleCommand(command) {
      // 写入到 sessionStore 方便 axios 每次请求获取 tab 范围内的租户ID
      setStore({name: "tenantId", content: command, type: "session"});
      // 写入到 localStore 方便 下次登录回显上次选择的租户ID
      setStore({name: "tenantId", content: command});
    },
    getTenantList() {
      return fetchList().then((response) => {
        this.tenantList = response.data.data;
      })
    },
    handleAutoTenant() {
      let domain = window.location.host
      this.tenantList.forEach(tenant => {
        if (domain.indexOf(tenant.tenantDomain) >= 0) {
          this.handleCommand(tenant.id)
          console.log("当前域名:", domain, "自动匹配租户:", tenant.name)
        }
      })
    }
  },
};
</script>

<style lang="scss">
@import "@/styles/login.scss";
</style>

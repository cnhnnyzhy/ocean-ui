export default {
  title: 'PigX 快速开发框架',
  subtitle: 'PigX',
  copyright: 'Copyright © 2022 pig4cloud.com. All rights reserved.',
  isFirstPage: true,// 配置首页不可关闭
  key: 'pigx', // 配置主键,目前用于存储
  validateCode: true,//是否开启验证码校验
  passwordEnc: true,//是否开启密码加密传输
  register: true, //是否开启注册
  connectSync: true, //是否开启互联同步
  domainAutoTenant: false,// 是否根据 domain 自动匹配租户
  formLoginClient: 'pig:pig',// 用户名密码登录的 client 信息
  smsLoginClient: 'app:app',// 验证码登录的 client 信息
  socialLoginClient: 'social:social',// 社交登录的 client 信息
  websocket: false, // 是否开启websocket
  whiteList: ['/login', '/404', '/401', '/lock'], // 配置无权限可以访问的页面
  whiteTagList: ['/login', '/404', '/401', '/lock'], // 配置不添加tags页面 （'/advanced-router/mutative-detail/*'——*为通配符）
  fistPage: {
    label: '首页',
    value: '/wel/index',
    params: {},
    query: {},
    group: [],
    close: false
  },
  // 配置菜单的属性
  menu: {
    props: {
      label: 'label',
      path: 'path',
      icon: 'icon',
      children: 'children'
    }
  }
}

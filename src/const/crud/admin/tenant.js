/*
 *    Copyright (c) 2018-2025, lengleng All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: lengleng (wangiegie@gmail.com)
 */

import {getObj} from "@/api/admin/tenant.js";
import {validatenull} from "@/util/validate.js";

const validateTenantCode = (rule, value, callback) => {
  let obj = {'code': value}
  getObj(obj).then(response => {
    if (window.boxType === 'edit') {
      return callback()
    }
    const result = response.data.data
    if (result && result.length !== 0) {
      callback(new Error('同名租户标识已存在'))
    } else {
      callback()
    }
  })
}

const validateTenantDomain = (rule, value, callback) => {
  if (validatenull(value)) {
    return callback()
  }

  let obj = {'tenantDomain': value}
  getObj(obj).then(response => {
    if (window.boxType === 'edit') {
      return callback()
    }
    const result = response.data.data
    if (result && result.length !== 0) {
      callback(new Error('域名已存在'))
    } else {
      callback()
    }
  })
}

export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  searchMenuSpan: 6,
  align: 'center',
  column: [
    {
      label: '租户id',
      prop: 'id',
      hide: true,
      editDisabled: true,
      editDisplay: false,
      addDisplay: false
    },
    {
      label: '租户名称',
      prop: 'name',
      search: true,
      rules: [
        {required: true, message: '请输入租户名称', trigger: 'blur'},
        {min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur'}
      ]
    },
    {
      label: '租户编号',
      type: 'number',
      prop: 'code',
      editDisabled: true,
      rules: [{
        required: true,
        message: '请输入租户编号',
        trigger: 'blur'
      }, {validator: validateTenantCode, trigger: 'blur'}]
    },
    {
      label: '租户域名',
      prop: 'tenantDomain',
      search: true,
      rules: [{
        required: false,
        message: '请输入租户域名',
        trigger: 'blur'
      }, {validator: validateTenantDomain, trigger: 'blur'}]
    },
    {
      label: '开始时间',
      prop: 'startTime',
      type: 'datetime',
      format: 'yyyy-MM-dd hh:mm:ss',
      valueFormat: 'yyyy-MM-dd hh:mm:ss',
      rules: [{
        required: true,
        message: '请输入结束时间',
        trigger: 'blur'
      }]
    },
    {
      label: '结束时间',
      prop: 'endTime',
      type: 'datetime',
      format: 'yyyy-MM-dd hh:mm:ss',
      valueFormat: 'yyyy-MM-dd hh:mm:ss',
      rules: [{
        required: true,
        message: '请输入结束时间',
        trigger: 'blur'
      }]
    },
    {
      label: '状态',
      prop: 'status',
      type: 'radio',
      border: true,
      dicUrl: '/admin/dict/type/status_type',
      search: true
    }
  ]
}

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

import {remote} from "@/api/admin/dict.js";

const validateDict = (rule, value, callback) => {
  remote(value).then(response => {
    if (window.boxType === 'edit') {
      return callback()
    }
    const result = response.data.data
    if (result && result.length !== 0) {
      callback(new Error('同名字典已存在'))
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
  align: 'center',
  refreshBtn: false,
  showClomnuBtn: false,
  searchMenuSpan: 6,
  searchSize: 'mini',
  column: [{
    label: '类型',
    prop: 'dictType',
    search: true,
    editDisabled: true,
    rules: [{
      required: true,
      message: '请输入字典类型',
      trigger: 'blur'
    }, {validator: validateDict, trigger: 'blur'}]
  }, {
    label: '描述',
    prop: 'description',
    rules: [{
      required: true,
      message: '请输入字典描述',
      trigger: 'blur'
    }]
  }, {
    label: '字典类型',
    prop: 'systemFlag',
    type: 'select',
    dicUrl: '/admin/dict/type/dict_type',
    rules: [{
      required: true,
      message: '请输入字典类型',
      trigger: 'blur'
    }],
    search: true
  }, {
    label: '备注信息',
    prop: 'remarks'
  }, {
    width: 150,
    label: '创建时间',
    prop: 'createTime',
    type: 'datetime',
    addDisplay: false,
    editDisabled: true,
    format: 'yyyy-MM-dd HH:mm',
    valueFormat: 'yyyy-MM-dd HH:mm:ss'
  }]
}

export const tableDictItemOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  refreshBtn: false,
  showClomnuBtn: false,
  searchSize: 'mini',
  column: [{
    label: '类型',
    prop: 'dictType',
    addDisabled: true,
    editDisabled: true
  }, {
    width: 150,
    label: '数据值',
    prop: 'value',
    rules: [{
      required: true,
      message: '请输入数据值',
      trigger: 'blur'
    }]
  }, {
    label: '标签名',
    prop: 'label',
    rules: [{
      required: true,
      message: '请输入标签名',
      trigger: 'blur'
    }]
  }, {
    label: '描述',
    prop: 'description',
    rules: [{
      required: true,
      message: '请输入字典描述',
      trigger: 'blur'
    }]
  }, {
    label: '排序',
    prop: 'sortOrder',
    type: 'number',
    rules: [{
      required: true,
      message: '请输入排序',
      trigger: 'blur'
    }]
  }, {
    label: '备注信息',
    prop: 'remarks'
  }]
}

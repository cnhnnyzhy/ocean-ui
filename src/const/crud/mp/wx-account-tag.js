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

export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  viewBtn: true,
  align: 'center',
  searchMenuSpan: 6,
  column: [
    {
      label: '主键',
      prop: 'id',
      hide: true,
      display: false
    },
    {
      label: '标签名称',
      prop: 'tag',
      rules: [{
        min: 1,
        max: 30,
        message: '请输入标签名称',
        trigger: 'blur'
      }]
    },
    {
      label: '标签ID',
      prop: 'tagId',
      editDisabled: true,
      addDisplay: false
    },
    {
      label: 'APPID',
      prop: 'wxAccountAppid',
      hide: true,
      editDisabled: true,
      addDisplay: false
    },
    {
      label: '创建时间',
      prop: 'createTime',
      editDisabled: true,
      addDisplay: false
    }
  ]
}

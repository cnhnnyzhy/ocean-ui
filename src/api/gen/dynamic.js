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

import request from '@/router/axios'

export function dynamicApi(table) {
  return request({
    url: '/gen/dynamic/gen',
    method: 'get',
    params: table
  })
}


export function getTableConfig(tableName, dsName) {
  return request({
    url: '/gen/form/info',
    params: {tableName: tableName, dsName: dsName},
    method: 'get'
  })
}

export function getTableData(tableName, dsName, query) {
  return request({
    url: `/gen/api/dynamic/${dsName}/${tableName}/list`,
    method: 'post',
    params: query
  })
}

export function delTableData(tableName, dsName, id) {
  return request({
    url: `/gen/api/dynamic/${dsName}/${tableName}/delete?id=` + id,
    method: 'delete'
  })
}

export function addTableData(tableName, dsName, obj) {
  return request({
    url: `/gen/api/dynamic/${dsName}/${tableName}/save`,
    method: 'post',
    data: obj
  })
}

export function updateTableData(tableName, dsName,obj) {
  return request({
    url: `/gen/api/dynamic/${dsName}/${tableName}/update`,
    method: 'put',
    data: obj
  })
}

import request from '@/utils/request'

// 查询专业列表
export function listMajorofSc(query) {
  return request({
    url: '/system/majorofSc/list',
    method: 'get',
    params: query
  })
}

// 查询专业详细
export function getMajorofSc(id) {
  return request({
    url: '/system/majorofSc/' + id,
    method: 'get'
  })
}

// 新增专业
export function addMajorofSc(data) {
  return request({
    url: '/system/majorofSc',
    method: 'post',
    data: data
  })
}

// 修改专业
export function updateMajorofSc(data) {
  return request({
    url: '/system/majorofSc',
    method: 'put',
    data: data
  })
}

// 删除专业
export function delMajorofSc(id) {
  return request({
    url: '/system/majorofSc/' + id,
    method: 'delete'
  })
}

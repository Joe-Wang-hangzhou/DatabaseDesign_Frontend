import request from '@/utils/request'

// 查询管理员列表
export function listAdminofSc(query) {
  return request({
    url: '/system/adminofSc/list',
    method: 'get',
    params: query
  })
}

// 查询管理员详细
export function getAdminofSc(id) {
  return request({
    url: '/system/adminofSc/' + id,
    method: 'get'
  })
}

// 新增管理员
export function addAdminofSc(data) {
  return request({
    url: '/system/adminofSc',
    method: 'post',
    data: data
  })
}

// 修改管理员
export function updateAdminofSc(data) {
  return request({
    url: '/system/adminofSc',
    method: 'put',
    data: data
  })
}

// 删除管理员
export function delAdminofSc(id) {
  return request({
    url: '/system/adminofSc/' + id,
    method: 'delete'
  })
}

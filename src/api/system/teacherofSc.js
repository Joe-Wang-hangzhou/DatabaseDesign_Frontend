import request from '@/utils/request'

// 查询教师列表
export function listTeacherofSc(query) {
  return request({
    url: '/system/teacherofSc/list',
    method: 'get',
    params: query
  })
}

// 查询教师详细
export function getTeacherofSc(id) {
  return request({
    url: '/system/teacherofSc/' + id,
    method: 'get'
  })
}

// 新增教师
export function addTeacherofSc(data) {
  return request({
    url: '/system/teacherofSc',
    method: 'post',
    data: data
  })
}

// 修改教师
export function updateTeacherofSc(data) {
  return request({
    url: '/system/teacherofSc',
    method: 'put',
    data: data
  })
}

// 删除教师
export function delTeacherofSc(id) {
  return request({
    url: '/system/teacherofSc/' + id,
    method: 'delete'
  })
}

import request from '@/utils/request'

// 查询授课列表
export function listTeachingofSc(query) {
  return request({
    url: '/system/teachingofSc/list',
    method: 'get',
    params: query
  })
}

// 查询授课详细
export function getTeachingofSc(id) {
  return request({
    url: '/system/teachingofSc/' + id,
    method: 'get'
  })
}

// 新增授课
export function addTeachingofSc(data) {
  return request({
    url: '/system/teachingofSc',
    method: 'post',
    data: data
  })
}

// 修改授课
export function updateTeachingofSc(data) {
  return request({
    url: '/system/teachingofSc',
    method: 'put',
    data: data
  })
}

// 删除授课
export function delTeachingofSc(id) {
  return request({
    url: '/system/teachingofSc/' + id,
    method: 'delete'
  })
}

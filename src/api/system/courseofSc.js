import request from '@/utils/request'

// 查询课程列表
export function listCourseofSc(query) {
  return request({
    url: '/system/courseofSc/list',
    method: 'get',
    params: query
  })
}

// 查询课程详细
export function getCourseofSc(id) {
  return request({
    url: '/system/courseofSc/' + id,
    method: 'get'
  })
}

// 新增课程
export function addCourseofSc(data) {
  return request({
    url: '/system/courseofSc',
    method: 'post',
    data: data
  })
}

// 修改课程
export function updateCourseofSc(data) {
  return request({
    url: '/system/courseofSc',
    method: 'put',
    data: data
  })
}

// 删除课程
export function delCourseofSc(id) {
  return request({
    url: '/system/courseofSc/' + id,
    method: 'delete'
  })
}

import request from '@/utils/request'

// 查询选课列表
export function listEnrollmentofSc(query) {
  return request({
    url: '/system/enrollmentofSc/list',
    method: 'get',
    params: query
  })
}

// 查询选课详细
export function getEnrollmentofSc(id) {
  return request({
    url: '/system/enrollmentofSc/' + id,
    method: 'get'
  })
}

// 新增选课
export function addEnrollmentofSc(data) {
  return request({
    url: '/system/enrollmentofSc',
    method: 'post',
    data: data
  })
}

// 修改选课
export function updateEnrollmentofSc(data) {
  return request({
    url: '/system/enrollmentofSc',
    method: 'put',
    data: data
  })
}

// 删除选课
export function delEnrollmentofSc(id) {
  return request({
    url: '/system/enrollmentofSc/' + id,
    method: 'delete'
  })
}

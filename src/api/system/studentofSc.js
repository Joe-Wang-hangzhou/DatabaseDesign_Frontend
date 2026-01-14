import request from '@/utils/request'

// 查询学生列表
export function listStudentofSc(query) {
  return request({
    url: '/system/studentofSc/list',
    method: 'get',
    params: query
  })
}

// 查询学生详细
export function getStudentofSc(id) {
  return request({
    url: '/system/studentofSc/' + id,
    method: 'get'
  })
}

// 新增学生
export function addStudentofSc(data) {
  return request({
    url: '/system/studentofSc',
    method: 'post',
    data: data
  })
}

// 修改学生
export function updateStudentofSc(data) {
  return request({
    url: '/system/studentofSc',
    method: 'put',
    data: data
  })
}

// 删除学生
export function delStudentofSc(id) {
  return request({
    url: '/system/studentofSc/' + id,
    method: 'delete'
  })
}

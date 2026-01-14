import request from '@/utils/request'

// 查询学院列表
export function listCollegeofSc(query) {
  return request({
    url: '/system/collegeofSc/list',
    method: 'get',
    params: query
  })
}

// 查询学院详细
export function getCollegeofSc(id) {
  return request({
    url: '/system/collegeofSc/' + id,
    method: 'get'
  })
}

// 新增学院
export function addCollegeofSc(data) {
  return request({
    url: '/system/collegeofSc',
    method: 'post',
    data: data
  })
}

// 修改学院
export function updateCollegeofSc(data) {
  return request({
    url: '/system/collegeofSc',
    method: 'put',
    data: data
  })
}

// 删除学院
export function delCollegeofSc(id) {
  return request({
    url: '/system/collegeofSc/' + id,
    method: 'delete'
  })
}

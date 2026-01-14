import request from '@/utils/request'

// 查询班级列表
export function listClassofSc(query) {
  return request({
    url: '/system/classofSc/list',
    method: 'get',
    params: query
  })
}

// 查询班级详细
export function getClassofSc(id) {
  return request({
    url: '/system/classofSc/' + id,
    method: 'get'
  })
}

// 新增班级
export function addClassofSc(data) {
  return request({
    url: '/system/classofSc',
    method: 'post',
    data: data
  })
}

// 修改班级
export function updateClassofSc(data) {
  return request({
    url: '/system/classofSc',
    method: 'put',
    data: data
  })
}

// 删除班级
export function delClassofSc(id) {
  return request({
    url: '/system/classofSc/' + id,
    method: 'delete'
  })
}

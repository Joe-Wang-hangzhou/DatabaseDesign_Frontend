import request from '@/utils/request'

// 查询成绩列表
export function listScoreofSC(query) {
  return request({
    url: '/system/scoreofSC/list',
    method: 'get',
    params: query
  })
}

// 查询成绩详细
export function getScoreofSC(id) {
  return request({
    url: '/system/scoreofSC/' + id,
    method: 'get'
  })
}

// 新增成绩
export function addScoreofSC(data) {
  return request({
    url: '/system/scoreofSC',
    method: 'post',
    data: data
  })
}

// 修改成绩
export function updateScoreofSC(data) {
  return request({
    url: '/system/scoreofSC',
    method: 'put',
    data: data
  })
}

// 删除成绩
export function delScoreofSC(id) {
  return request({
    url: '/system/scoreofSC/' + id,
    method: 'delete'
  })
}

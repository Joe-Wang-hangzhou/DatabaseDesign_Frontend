import request from '@/utils/request'

// 执行SQL语句
export function executeSql(sql) {
  const data = {
    sql: sql
  }
  return request({
    url: '/system/sqlConsole/execute',
    method: 'post',
    data: data
  })
}

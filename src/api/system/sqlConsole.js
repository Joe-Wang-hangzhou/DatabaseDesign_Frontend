import request from '@/utils/request'

// Ö´ÐÐSQLÓï¾ä
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

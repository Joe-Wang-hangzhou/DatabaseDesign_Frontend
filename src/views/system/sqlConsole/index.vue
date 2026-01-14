<template>
  <div class="app-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>SQL语句控制台</span>
        </div>
      </template>
      
      <el-form :model="form" label-width="80px">
        <el-form-item label="SQL语句">
          <el-input
            v-model="form.sql"
            type="textarea"
            :rows="8"
            placeholder="请输入SQL语句"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Promotion" @click="handleExecute" :loading="loading">
            提交SQL
          </el-button>
          <el-button icon="Refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>

      <el-divider />

      <!-- 执行结果 -->
      <div v-if="resultVisible">
        <div class="result-header">
          <span class="result-title">执行结果</span>
          <el-tag :type="resultType" style="margin-left: 10px">
            {{ resultType === 'success' ? '执行成功' : '执行失败' }}
          </el-tag>
        </div>
        
        <!-- 成功时显示表格 -->
        <div v-if="resultType === 'success' && tableData.length > 0" style="margin-top: 20px">
          <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%"
            max-height="500"
            v-loading="loading"
          >
            <el-table-column
              v-for="(column, index) in tableColumns"
              :key="index"
              :prop="column"
              :label="column"
              min-width="150"
              show-overflow-tooltip
            />
          </el-table>
          <div style="margin-top: 10px; color: #909399; font-size: 12px">
            共 {{ tableData.length }} 条记录
          </div>
        </div>
        
        <!-- 成功但无数据 -->
        <div v-if="resultType === 'success' && tableData.length === 0" style="margin-top: 20px">
          <el-empty description="SQL执行成功，但未返回数据" />
        </div>
        
        <!-- 失败时显示错误信息 -->
        <div v-if="resultType === 'error'" style="margin-top: 20px">
          <el-alert
            :title="errorMessage"
            type="error"
            :closable="false"
            show-icon
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup name="SqlConsole">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { executeSql } from '@/api/system/sqlConsole'

const form = reactive({
  sql: ''
})

const loading = ref(false)
const resultVisible = ref(false)
const resultType = ref('success')
const errorMessage = ref('')
const tableData = ref([])
const tableColumns = ref([])

// 执行SQL
const handleExecute = () => {
  if (!form.sql || !form.sql.trim()) {
    ElMessage.warning('请输入SQL语句')
    return
  }
  
  loading.value = true
  resultVisible.value = false
  
  executeSql(form.sql.trim())
    .then(response => {
      loading.value = false
      resultVisible.value = true
      
      if (response.code === 200) {
        resultType.value = 'success'
        
        // 处理返回的数据
        if (response.data) {
          if (Array.isArray(response.data)) {
            // 如果是数组，直接使用
            if (response.data.length > 0) {
              tableColumns.value = Object.keys(response.data[0])
              tableData.value = response.data
            } else {
              tableData.value = []
              tableColumns.value = []
            }
          } else if (response.data.rows && Array.isArray(response.data.rows)) {
            // 如果数据在rows字段中
            if (response.data.rows.length > 0) {
              tableColumns.value = Object.keys(response.data.rows[0])
              tableData.value = response.data.rows
            } else {
              tableData.value = []
              tableColumns.value = []
            }
          } else if (response.data.columns && response.data.data) {
            // 如果后端返回了columns和data分离的结构
            tableColumns.value = response.data.columns
            tableData.value = response.data.data
          } else {
            // 尝试将对象转换为数组
            tableColumns.value = Object.keys(response.data)
            tableData.value = [response.data]
          }
        } else {
          tableData.value = []
          tableColumns.value = []
        }
      } else {
        resultType.value = 'error'
        errorMessage.value = response.msg || '执行失败'
      }
    })
    .catch(error => {
      loading.value = false
      resultVisible.value = true
      resultType.value = 'error'
      errorMessage.value = error.msg || error.message || 'SQL执行失败，请检查SQL语句是否正确'
      tableData.value = []
      tableColumns.value = []
    })
}

// 清空
const handleReset = () => {
  form.sql = ''
  resultVisible.value = false
  tableData.value = []
  tableColumns.value = []
  errorMessage.value = ''
}
</script>

<style scoped lang="scss">
.app-container {
  padding: 20px;
}

.box-card {
  min-height: calc(100vh - 120px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
}

.result-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.result-title {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}

:deep(.el-textarea__inner) {
  font-family: 'Courier New', monospace;
  font-size: 14px;
}
</style>

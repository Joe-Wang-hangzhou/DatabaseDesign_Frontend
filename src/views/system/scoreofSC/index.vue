<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="选课ID" prop="enrollmentId">
        <el-input
          v-model="queryParams.enrollmentId"
          placeholder="请输入选课ID"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="平时成绩" prop="usualScore">
        <el-input
          v-model="queryParams.usualScore"
          placeholder="请输入平时成绩"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="期中成绩" prop="midScore">
        <el-input
          v-model="queryParams.midScore"
          placeholder="请输入期中成绩"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="期末成绩" prop="finalScore">
        <el-input
          v-model="queryParams.finalScore"
          placeholder="请输入期末成绩"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="总评成绩" prop="totalScore">
        <el-input
          v-model="queryParams.totalScore"
          placeholder="请输入总评成绩"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['system:scoreofSC:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:scoreofSC:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:scoreofSC:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['system:scoreofSC:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="scoreofSCList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="成绩ID" align="center" prop="id" />
      <el-table-column label="选课ID" align="center" prop="enrollmentId" />
      <el-table-column label="平时成绩" align="center" prop="usualScore" />
      <el-table-column label="期中成绩" align="center" prop="midScore" />
      <el-table-column label="期末成绩" align="center" prop="finalScore" />
      <el-table-column label="总评成绩" align="center" prop="totalScore" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['system:scoreofSC:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['system:scoreofSC:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改成绩对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="scoreofSCRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="选课ID" prop="enrollmentId">
          <el-input v-model="form.enrollmentId" placeholder="请输入选课ID" />
        </el-form-item>
        <el-form-item label="平时成绩" prop="usualScore">
          <el-input v-model="form.usualScore" placeholder="请输入平时成绩" />
        </el-form-item>
        <el-form-item label="期中成绩" prop="midScore">
          <el-input v-model="form.midScore" placeholder="请输入期中成绩" />
        </el-form-item>
        <el-form-item label="期末成绩" prop="finalScore">
          <el-input v-model="form.finalScore" placeholder="请输入期末成绩" />
        </el-form-item>
        <el-form-item label="总评成绩" prop="totalScore">
          <el-input v-model="form.totalScore" placeholder="请输入总评成绩" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="ScoreofSC">
import { listScoreofSC, getScoreofSC, delScoreofSC, addScoreofSC, updateScoreofSC } from "@/api/system/scoreofSC"

const { proxy } = getCurrentInstance()

const scoreofSCList = ref([])
const open = ref(false)
const loading = ref(true)
const showSearch = ref(true)
const ids = ref([])
const single = ref(true)
const multiple = ref(true)
const total = ref(0)
const title = ref("")

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    enrollmentId: null,
    usualScore: null,
    midScore: null,
    finalScore: null,
    totalScore: null
  },
  rules: {
    enrollmentId: [
      { required: true, message: "选课ID不能为空", trigger: "blur" }
    ],
  }
})

const { queryParams, form, rules } = toRefs(data)

/** 查询成绩列表 */
function getList() {
  loading.value = true
  listScoreofSC(queryParams.value).then(response => {
    scoreofSCList.value = response.rows
    total.value = response.total
    loading.value = false
  })
}

// 取消按钮
function cancel() {
  open.value = false
  reset()
}

// 表单重置
function reset() {
  form.value = {
    id: null,
    enrollmentId: null,
    usualScore: null,
    midScore: null,
    finalScore: null,
    totalScore: null
  }
  proxy.resetForm("scoreofSCRef")
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1
  getList()
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef")
  handleQuery()
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id)
  single.value = selection.length != 1
  multiple.value = !selection.length
}

/** 新增按钮操作 */
function handleAdd() {
  reset()
  open.value = true
  title.value = "添加成绩"
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset()
  const _id = row.id || ids.value
  getScoreofSC(_id).then(response => {
    form.value = response.data
    open.value = true
    title.value = "修改成绩"
  })
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["scoreofSCRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateScoreofSC(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功")
          open.value = false
          getList()
        })
      } else {
        addScoreofSC(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功")
          open.value = false
          getList()
        })
      }
    }
  })
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value
  proxy.$modal.confirm('是否确认删除成绩编号为"' + _ids + '"的数据项？').then(function() {
    return delScoreofSC(_ids)
  }).then(() => {
    getList()
    proxy.$modal.msgSuccess("删除成功")
  }).catch(() => {})
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('system/scoreofSC/export', {
    ...queryParams.value
  }, `scoreofSC_${new Date().getTime()}.xlsx`)
}

getList()
</script>

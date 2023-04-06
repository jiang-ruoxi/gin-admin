<template>
  <div>
    <div class="gva-search-box">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline" @keyup.enter="onSubmit">
        <el-form-item label="类型">
          <el-select v-model="searchInfo.categoryId" placeholder="请选择" style="width:100%" :clearable="true">
            <el-option v-for="item in category_list" :key="item.ID" :label="item.name" :value="item.ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问题">
          <el-input v-model="searchInfo.question" placeholder="搜索条件"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button icon="refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button type="primary" icon="plus" @click="openDialog">新增</el-button>
        <el-popover v-model:visible="deleteVisible" placement="top" width="160">
          <p>确定要删除吗？</p>
          <div style="text-align: right; margin-top: 8px;">
            <el-button type="primary" link @click="deleteVisible = false">取消</el-button>
            <el-button type="primary" @click="onDelete">确定</el-button>
          </div>
          <template #reference>
            <el-button icon="delete" style="margin-left: 10px;" :disabled="!multipleSelection.length"
                       @click="deleteVisible = true">删除
            </el-button>
          </template>
        </el-popover>
      </div>
      <el-table
          ref="multipleTable"
          style="width: 100%"
          tooltip-effect="dark"
          :data="tableData"
          row-key="ID"
          @selection-change="handleSelectionChange"
          @sort-change="sortChange"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column align="left" label="编号" prop="ID" width="80" sortable />
        <el-table-column align="center" label="类型" prop="category" width="100">
          <template #default="scope">
            <el-tag
                :type="scope.row.category === '文史类' ? 'success' : scope.row.category === '科学类' ? '' : scope.row.category === '哲学类' ? 'warning' : scope.row.category === '科技类' ? 'danger' : 'info'"
                type="success"
            >{{ scope.row.category }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="问题" prop="question" width="300%" :show-overflow-tooltip='true'/>
        <el-table-column align="left" label="选项A" prop="optionA" width="150%" :show-overflow-tooltip='true'/>
        <el-table-column align="left" label="选项B" prop="optionB" width="150%" :show-overflow-tooltip='true'/>
        <el-table-column align="left" label="选项C" prop="optionC" width="150%" :show-overflow-tooltip='true'/>
        <el-table-column align="left" label="选项D" prop="optionD" width="150%" :show-overflow-tooltip='true'/>
        <el-table-column align="left" label="答案" prop="answer" width="80">
          <template #default="scope">
            <el-tag
                :type="scope.row.answer === 'A' ? 'success' : scope.row.answer === 'B' ? '' : scope.row.answer === 'C' ? 'warning' : scope.row.answer === 'D' ? 'danger' : 'info'"
                type="success"
                effect="dark"
            >{{ scope.row.answer }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="操作">
          <template #default="scope">
            <el-button type="primary" link icon="edit" class="table-button" @click="updateBaikeFunc(scope.row)">修改
            </el-button>
            <el-button type="primary" link icon="delete" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="gva-pagination">
        <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="page"
            :page-size="pageSize"
            :page-sizes="[10, 30, 50, 100]"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
        />
      </div>
    </div>
    <el-dialog v-model="dialogFormVisible" :before-close="closeDialog" title="弹窗操作">
      <el-form :model="formData" label-position="right" ref="elFormRef" :rules="rule" label-width="80px">
        <el-form-item label="类型:" prop="categoryId">
          <el-select v-model="formData.categoryId" placeholder="请选择" style="width:100%" :clearable="true">
            <el-option v-for="item in category_list" :key="item.ID" :label="item.name" :value="item.ID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="问题:" prop="question">
          <el-input v-model="formData.question" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="选项A:" prop="optionA">
          <el-input v-model="formData.optionA" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="选项B:" prop="optionB">
          <el-input v-model="formData.optionB" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="选项C:" prop="optionC">
          <el-input v-model="formData.optionC" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="选项D:" prop="optionD">
          <el-input v-model="formData.optionD" :clearable="true" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="答案:" prop="answer">
          <el-select v-model="formData.answer" placeholder="请选择" style="width:100%" :clearable="true">
            <el-option label="A" value="A"></el-option>
            <el-option label="B" value="B"></el-option>
            <el-option label="C" value="C"></el-option>
            <el-option label="D" value="D"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="原因:" prop="analytic">
          <el-input v-model="formData.analytic" :clearable="true" placeholder="请输入"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="enterDialog">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Baike'
}
</script>

<script setup>
import {
  createBaike,
  deleteBaike,
  deleteBaikeByIds,
  updateBaike,
  findBaike,
  getBaikeList,
} from '@/api/baike'

import {
  getCategoryListAll,
} from '@/api/category'

// 全量引入格式化工具 请按需保留
import {getDictFunc, formatDate, formatBoolean, filterDict} from '@/utils/format'
import {ElMessage, ElMessageBox} from 'element-plus'
import {ref, reactive} from 'vue'

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  categoryId: 0,
  question: '',
  optionA: '',
  optionB: '',
  optionC: '',
  optionD: '',
  answer: '',
  analytic: '',
  addTime: 0,
})

// 验证规则
const rule = reactive({
  categoryId: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
  question: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
  optionA: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
  optionB: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
  optionC: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
  optionD: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
  answer: [{
    required: true,
    message: '',
    trigger: ['input', 'blur'],
  }],
})

const elFormRef = ref()


// =========== 表格控制部分 ===========
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({})

// 重置
const onReset = () => {
  searchInfo.value = {}
  getTableData()
}

// 搜索
const onSubmit = () => {
  page.value = 1
  pageSize.value = 10
  getTableData()
}

// 分页
const handleSizeChange = (val) => {
  pageSize.value = val
  getTableData()
}

// 修改页面容量
const handleCurrentChange = (val) => {
  page.value = val
  getTableData()
}

// 查询
const getTableData = async () => {
  const table = await getBaikeList({page: page.value, pageSize: pageSize.value, ...searchInfo.value})
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

// 排序
const sortChange = ({ prop, order }) => {
  searchInfo.value.sort = prop;
  searchInfo.value.order = order;
  getTableData();
};

getTableData()

// ============== 表格控制部分结束 ===============

// 获取需要的字典 可能为空 按需保留
const setOptions = async () => {
}

// 获取需要的字典 可能为空 按需保留
setOptions()


// 多选数据
const multipleSelection = ref([])
// 多选
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

// 删除行
const deleteRow = (row) => {
  ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteBaikeFunc(row)
  })
}


// 批量删除控制标记
const deleteVisible = ref(false)

// 多选删除
const onDelete = async () => {
  const ids = []
  if (multipleSelection.value.length === 0) {
    ElMessage({
      type: 'warning',
      message: '请选择要删除的数据'
    })
    return
  }
  multipleSelection.value &&
  multipleSelection.value.map(item => {
    ids.push(item.ID)
  })
  const res = await deleteBaikeByIds({ids})
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    if (tableData.value.length === ids.length && page.value > 1) {
      page.value--
    }
    deleteVisible.value = false
    getTableData()
  }
}

// 行为控制标记（弹窗内部需要增还是改）
const type = ref('')

// 更新行
const updateBaikeFunc = async (row) => {
  const res = await findBaike({ID: row.ID})
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.rebaike
    dialogFormVisible.value = true
  }
}


// 删除行
const deleteBaikeFunc = async (row) => {
  const res = await deleteBaike({ID: row.ID})
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    if (tableData.value.length === 1 && page.value > 1) {
      page.value--
    }
    getTableData()
  }
}

// 弹窗控制标记
const dialogFormVisible = ref(false)

// 打开弹窗
const openDialog = () => {
  type.value = 'create'
  dialogFormVisible.value = true
}

// 关闭弹窗
const closeDialog = () => {
  dialogFormVisible.value = false
  formData.value = {
    categoryId: 0,
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    answer: '',
    analytic: '',
    addTime: 0,
  }
}
// 弹窗确定
const enterDialog = async () => {
  elFormRef.value?.validate(async (valid) => {
    if (!valid) return
    let res
    switch (type.value) {
      case 'create':
        res = await createBaike(formData.value)
        break
      case 'update':
        res = await updateBaike(formData.value)
        break
      default:
        res = await createBaike(formData.value)
        break
    }
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '创建/更改成功'
      })
      closeDialog()
      getTableData()
    }
  })
}

//初始化下拉选择项
const category_list = ref();
const getCategoryData = async () => {

  const res = await getCategoryListAll();
  if (res.code === 0) {
    category_list.value = res.data.list;
  }
};
getCategoryData();
</script>

<style>
</style>

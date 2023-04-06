<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="类型:" prop="categoryId">
          <el-input v-model.number="formData.categoryId" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="问题:" prop="question">
          <el-input v-model="formData.question" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="选项A:" prop="optionA">
          <el-input v-model="formData.optionA" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="选项B:" prop="optionB">
          <el-input v-model="formData.optionB" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="选项C:" prop="optionC">
          <el-input v-model="formData.optionC" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="选项D:" prop="optionD">
          <el-input v-model="formData.optionD" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="答案:" prop="answer">
          <el-input v-model="formData.answer" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="原因:" prop="analytic">
          <el-input v-model="formData.analytic" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="添加时间:" prop="addTime">
          <el-input v-model.number="formData.addTime" :clearable="true" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button type="primary" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
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
  updateBaike,
  findBaike
} from '@/api/baike'

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
const route = useRoute()
const router = useRouter()

const type = ref('')
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
               categoryId : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               question : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               optionA : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               optionB : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               optionC : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               optionD : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               answer : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findBaike({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.rebaike
        type.value = 'update'
      }
    } else {
      type.value = 'create'
    }
}

init()
// 保存按钮
const save = async() => {
      elFormRef.value?.validate( async (valid) => {
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
           }
       })
}

// 返回按钮
const back = () => {
    router.go(-1)
}

</script>

<style>
</style>

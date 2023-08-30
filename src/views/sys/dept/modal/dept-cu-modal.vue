<template>
  <VDialog
    v-model="visible"
    :title="props.mode === 'create' ? '新增部门' : '更新部门'"
    :width="deviceType === 'h5' ? '360px' : '720px'"
    :full-screen="deviceType === 'h5'"
    :fixed-body-height="deviceType === 'h5'"
    use-body-scrolling
    :loading="loading"
    @open="handleOpened(props.data)"
    @cancel="visible = false"
    @confirm="handleConfirm"
  >
    <el-form :model="formData" label-width="100px" :label-position="formLabelPosition" scroll-to-error :ref="setFormRef">
      <el-row>
        <el-col :span="12" :xl="12" :xs="24">
          <el-form-item label="名称" prop="name" required>
            <el-input v-model="formData.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="12" :xl="12" :xs="24">
          <el-form-item label="简称" prop="simpleName">
            <el-input v-model="formData.simpleName"/>
          </el-form-item>
        </el-col>
        <el-col :span="12" :xl="12" :xs="24">
          <el-form-item label="部门编码" prop="code" required>
            <el-input v-model="formData.code"/>
          </el-form-item>
        </el-col>
        <el-col :span="12" :xl="12" :xs="24">
          <el-form-item label="排序" prop="orderNo" required>
            <el-input-number v-model="formData.orderNo"/>
          </el-form-item>
        </el-col>
        <el-col :span="24" :xl="24" :xs="24">
          <el-form-item label="职能描述" prop="description">
            <el-input v-model="formData.description" type="textarea" :rows="2" />
          </el-form-item>
        </el-col>
        <el-col :span="24" :xl="24" :xs="24">
          <el-form-item label="上级部门" prop="pid">
            <el-tree-select
              style="width: 100%;"
              clearable
              filterable
              check-strictly
              node-key="id"
              :props="{ label: 'name', value: 'id', children: 'children' }"
              v-model="formData.pid"
              :data="props.options"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" :xl="24" :xs="24">
          <el-form-item label="部门领导" prop="owner">
            <user-selector-input v-model="formData.owner" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :span="24" :xl="24" :xs="24">
          <el-form-item label="部门助理" prop="assistant">
            <user-selector-input v-model="formData.assistant" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :span="24" :xl="24" :xs="24">
          <el-form-item label="电话" prop="phone">
            <el-input v-model="formData.phone" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24" :xl="24" :xs="24">
          <el-form-item label="办公地点" prop="officeLocation">
            <el-input v-model="formData.officeLocation" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24" :xl="24" :xs="24">
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="formData.address" type="textarea" :rows="2" />
          </el-form-item>
        </el-col>
        <el-col :span="24" :xl="24" :xs="24">
          <el-form-item label="状态" prop="status" required style="margin-bottom: 0">
            <dict-input v-model="formData.status" dict-key="common.status"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </VDialog>
</template>

<script lang="ts" setup>
import VDialog from "@/components/dialog/VDialog.vue";
import { computed } from "vue";
import { ElForm, ElFormItem, ElRow, ElCol, ElInput, ElTreeSelect, ElInputNumber } from "element-plus";
import { getDeviceType } from "@/utils/common";
import { formLabelPosition } from "@/store/layout";
import DictInput from "@/components/dict/DictInput.vue";
import { setFormRef, formRef, formData, handleOpened, loading } from './hook'
import { DepartmentAddDTO, DepartmentOutputDTO, DepartmentUpdateDTO } from "@/api/sys/dept/types";
import UserSelectorInput from "@/components/common/selector/user/UserSelectorInput.vue";


interface Props {
  modelValue: boolean
  mode: OperationType
  options: DepartmentOutputDTO[]
  data?: DepartmentOutputDTO
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  mode: 'create',
})

interface Emits {
  (e: 'update:modelValue', v: boolean): void
  (e: 'confirm', param: DepartmentAddDTO & DepartmentUpdateDTO): void
}
const emits = defineEmits<Emits>()
const deviceType = getDeviceType()

const visible = computed<boolean>({
  get: () =>  props.modelValue,
  set: v => emits('update:modelValue', v)
})

async function handleConfirm() {
  try {
    await formRef.value?.validate()
  } catch (e) {
    console.error(e);
    return
  }
  emits('confirm', formData)
}
</script>
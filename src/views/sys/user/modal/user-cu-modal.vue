<template>
  <VDialog
    v-model="visible"
    :title="props.mode === 'create' ? '新增用户' : '更新用户'"
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
          <el-form-item label="用户名" prop="username" required>
            <el-input :disabled="props.mode === 'update'" v-model="formData.username"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :xl="12" :xs="24" v-if="props.mode === 'create'">
          <el-form-item label="密码" prop="password" required>
            <el-input v-model="formData.password"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :xl="12" :xs="24">
          <el-form-item label="昵称" prop="nickname" required>
            <el-input v-model="formData.nickname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :xl="12" :xs="24">
          <el-form-item label="手机" prop="phone">
            <el-input v-model="formData.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :xl="12" :xs="24">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="formData.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" :xl="12" :xs="24">
          <el-form-item label="状态" prop="status">
            <dict-input v-model="formData.status" dict-key="common.status"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="部门" prop="deptId">
            <el-tree-select
              style="width: 100%;"
              clearable
              filterable
              check-strictly
              node-key="id"
              :props="{ label: 'name', value: 'id', children: 'children' }"
              v-model="formData.deptId"
              :data="deptList"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="兼职部门" prop="deptIdList">
            <el-tree-select
              style="width: 100%;"
              clearable
              filterable
              multiple
              check-strictly
              collapse-tags
              collapse-tags-tooltip
              node-key="id"
              :props="{ label: 'name', value: 'id', children: 'children' }"
              v-model="formData.deptIdList"
              :data="deptList"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="角色" prop="roleIdList">
            <el-tree-select
              style="width: 100%;"
              clearable
              filterable
              multiple
              node-key="id"
              :props="{ label: 'name', value: 'id', children: 'children' }"
              v-model="formData.roleIdList"
              :data="roleList"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="头像" prop="avatar" style="margin-bottom: 0">
            <el-input v-model="formData.avatar"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </VDialog>
</template>

<script lang="ts" setup>
import VDialog from "@/components/dialog/VDialog.vue";
import { computed } from "vue";
import { ElForm, ElFormItem, ElRow, ElCol, ElInput, ElTreeSelect } from "element-plus";
import { flattenTree, getDeviceType } from "@/utils/common";
import { formLabelPosition } from "@/store/layout";
import { UserAddDTO, UserOutputDTO, UserUpdateDTO } from "@/api/sys/user/types";
import DictInput from "@/components/dict/DictInput.vue";
import { setFormRef, formRef, formData, handleOpened, loading, deptList, roleList } from './hook'


interface Props {
  modelValue: boolean
  mode: OperationType
  data?: UserOutputDTO
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  mode: 'create',
})

interface Emits {
  (e: 'update:modelValue', v: boolean): void
  (e: 'confirm', param: UserAddDTO & UserUpdateDTO): void
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
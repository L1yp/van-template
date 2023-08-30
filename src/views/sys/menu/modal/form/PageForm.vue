<template>
  <el-row>
    <el-col :span="12" :xs="24">
      <el-form-item label="名称" prop="name" required>
        <el-input v-model="formData.name" />
      </el-form-item>
    </el-col>
    <ElCol :span="12" :xs="24">
      <ElFormItem label="序号" prop="orderNo" required>
        <ElInputNumber v-model="formData.orderNo" style="width: 100%"></ElInputNumber>
      </ElFormItem>
    </ElCol>
    <el-col :span="12" :xs="24">
      <el-form-item label="父菜单" prop="pid">
        <el-tree-select
          v-model="props.formData.pid"
          style="width: 100%"
          clearable
          node-key="id"
          :props="{ children: 'children', label: 'name', value: 'id' }"
          :data="parentOptions"
        />
      </el-form-item>
    </el-col>
    <el-col :span="12" :xs="24">
      <el-form-item label="图标" prop="meta.icon">
        <el-input v-model="props.formData.meta!.icon" />
      </el-form-item>
    </el-col>
    <el-col :span="12" :xs="24">
      <el-form-item label="路由" prop="path" required>
        <el-input v-model="props.formData.path"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12" :xs="24">
      <el-form-item label="组件" prop="component" required>
        <el-input v-model="props.formData.component"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12" :xs="24">
      <el-form-item label="可关闭" prop="meta.closeable" required>
        <BoolDictInput v-model="props.formData.meta!.closeable" dict-key="yes.no" />
      </el-form-item>
    </el-col>
    <el-col :span="12" :xs="24">
      <el-form-item label="状态" prop="status" required>
        <DictInput v-model="props.formData.status" dict-key="common.status" />
      </el-form-item>
    </el-col>
    <el-col :span="12" :xs="24">
      <el-form-item label="备注" prop="remark" style="margin-bottom: 0">
        <el-input v-model="formData.remark" />
      </el-form-item>
    </el-col>
  </el-row>

</template>

<script lang="ts" setup>
import { ElCol, ElFormItem, ElInput, ElRow, ElTreeSelect, ElRadioGroup, ElRadioButton, ElInputNumber } from "element-plus";
import { computed, toRaw } from "vue";
import { flattenTree, toTree } from "@/utils/common";
import DictInput from "@/components/dict/DictInput.vue";
import { MenuAddDTO, MenuOutputDTO, MenuType, MenuUpdateDTO } from "@/api/sys/menu/types";
import BoolDictInput from "@/components/dict/BoolDictInput.vue";

interface Props {
  formData: MenuUpdateDTO & MenuAddDTO
  menuTree: MenuOutputDTO[]
}

const props = defineProps<Props>()

const parentOptions = computed<MenuOutputDTO[]>(() => {
  const menus = toRaw(props.menuTree)

  const flatTree: MenuOutputDTO[] = flattenTree(JSON.parse(JSON.stringify(menus)))
  flatTree.forEach(it => it.children = [])
  const filterTree = flatTree.filter(it => [MenuType.Folder, MenuType.Tab].includes(it.type))
  return toTree(filterTree, 'id', 'pid')
})

</script>

<style scoped>

</style>
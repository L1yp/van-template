<template>
  <template v-if="readonly">
    <el-tag
      v-bind="option.attribute"
    >{{ option.description }}</el-tag>
  </template>
  <template v-else>
    <template v-if="props.multiple">
      <ElCheckboxGroup v-model="val">
        <el-checkbox-button
          :label="Boolean(option.value)"
          v-for="option in options"
          :key="option.value"
        >{{ option.description }}</el-checkbox-button>
      </ElCheckboxGroup>
    </template>
    <template v-else>
      <el-radio-group v-model="val">
        <el-radio-button
          :label="Boolean(option.value)"
          v-for="option in options"
          :key="option.value"
        >{{ option.description }}</el-radio-button>
      </el-radio-group>
    </template>
  </template>

</template>

<script lang="ts" setup>
import { ElRadioGroup, ElRadioButton, ElCheckboxGroup, ElCheckboxButton, ElTag } from 'element-plus'
import { computed } from 'vue';
import { useSystemStore } from "@/store/sys-config";
import { ConfigEnumOutputDTO } from "@/api/sys/config/types";

interface Props {
  multiple?: boolean
  readonly?: boolean
  dictKey: string
  modelValue?: boolean
}

interface Emits {
  (e: 'update:modelValue', v: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  readonly: false,
})

const emits = defineEmits<Emits>()

const store = useSystemStore()

const options = computed<ConfigEnumOutputDTO[]>(() => store.statusMap[props.dictKey])
const option = computed(() => options.value.find(it => it.value === Number(props.modelValue)))

const val = computed<boolean>({
  get: () => props.modelValue,
  set: v => emits('update:modelValue', v)
})



</script>

<style scoped>

</style>
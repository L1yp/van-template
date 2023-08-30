<template>
  <template v-if="readonly">
    <el-tag
      v-if="!!option"
      :disable-transitions="option.attribute.disableTransitions"
      :effect="option.attribute.effect"
      :hit="option.attribute.hit"
      :round="option.attribute.round"
      :type="option.attribute.type"
      v-bind="props.attrs"
    >{{ option?.description }}</el-tag>
  </template>
  <template v-else>
    <template v-if="props.expandOptions">
      <el-radio-group v-model="val" v-bind="props.attrs">
        <el-radio-button :label="option.value" v-for="option in options" :key="option.value">{{ option.description }}</el-radio-button>
      </el-radio-group>
    </template>
    <template v-else>
      <el-select v-model="val" v-bind="props.attrs">
        <el-option
          v-for="option in options"
          :key="option.value"
          :label="option.description"
          :value="option.value"
        />
      </el-select>
    </template>
  </template>

</template>

<script lang="ts" setup>
import { ElRadioGroup, ElRadioButton, ElTag, ElSelect, ElOption } from 'element-plus'
import { computed } from 'vue';
import { useSystemStore } from "@/store/sys-config";
import { ConfigEnumOutputDTO } from "@/api/sys/config/types";

defineOptions({
  inheritAttrs: false
})

interface Props {
  readonly?: boolean
  dictKey: string
  expandOptions?: boolean
  modelValue: number | undefined
  attrs?: Record<string, any>
}

interface Emits {
  (e: 'update:modelValue', v: number | undefined): void
  (e: 'change', v: number | undefined): void
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  readonly: false,
  expandOptions: true
})

const emits = defineEmits<Emits>()

const store = useSystemStore()
const options = computed<ConfigEnumOutputDTO[]>(() => store.statusMap[props.dictKey])
const option = computed(() => options.value.find(it => it.value === props.modelValue))

const val = computed<number | undefined>({
  get: () => {
    if(props.modelValue === null || props.modelValue === undefined) {
      return undefined;
    }
    return props.modelValue
  },
  set: v => {
    // @ts-ignore select emit 由于el-select的clear操作会emit一个空字符串出来, 因此此处需要特殊处理
    if (v === '') {
      emits('update:modelValue', undefined)
      emits('change', undefined)
    } else {
      emits('update:modelValue', v)
      emits('change', v)
    }

  }
})

</script>

<style scoped>

</style>

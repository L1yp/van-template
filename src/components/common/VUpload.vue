<template>
  <input
    type="file"
    ref="fileInputRef"
    style="display: none"
    :key="key"
    :multiple="props.multiple"
    :accept="props.accept"
    @change="handleFileChange"
  >
</template>

<script lang="ts" setup>
import { ref } from "vue"

interface Props {
  multiple?: boolean
  /**
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
   */
  accept?: string
}

interface Emits {
  (e: 'change', files: FileList): void
}

const emits = defineEmits<Emits>()

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  accept: '*/*'
})

const key = ref(Math.random())
const fileInputRef = ref<HTMLInputElement>()

function handleFileChange() {
  emits('change', fileInputRef.value?.files!)
  key.value = Math.random()
}

function open() {
  fileInputRef.value?.click()
}

defineExpose({
  open
})
</script>

<style scoped>

</style>

import { reactive, ref } from "vue";
import { DepartmentAddDTO, DepartmentOutputDTO, DepartmentUpdateDTO } from "@/api/sys/dept/types";
import { FormInstance } from "element-plus";


export const loading = ref(false)
export const formRef = ref<FormInstance>()
export function setFormRef(el: any) {
  formRef.value = el
}

export const formData = reactive<DepartmentAddDTO & DepartmentUpdateDTO>({
  id: "",
  code: "",
  name: "",
  orderNo: 0,
  status: 0
})

export function handleOpened(row?: DepartmentOutputDTO) {
  if (row) {
    Object.assign(formData, row)
  } else {
    Object.assign(formData, {
      code: "",
      name: "",
      orderNo: 0,
      status: 0
    })
  }
}

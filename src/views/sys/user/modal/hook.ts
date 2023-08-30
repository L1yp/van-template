import RoleApi from "@/api/sys/role";
import DeptApi from "@/api/sys/dept";
import { reactive, ref } from "vue";
import { RoleOutputDTO } from "@/api/sys/role/types";
import { DepartmentOutputDTO } from "@/api/sys/dept/types";
import { ElMessage, FormInstance } from "element-plus";
import { UserAddDTO, UserOutputDTO, UserUpdateDTO } from "@/api/sys/user/types";
import { toTree } from "@/utils/common";

const roleApi = new RoleApi()
const deptApi = new DeptApi()

export const loading = ref(false)
export const roleList = ref<RoleOutputDTO[]>([])
export const deptList = ref<DepartmentOutputDTO[]>([])

export async function initOptions() {
  try {
    loading.value = true
    roleList.value = await roleApi.list()
    const data = await deptApi.list()

    deptList.value = toTree(data, 'id', 'pid', 'orderNo', 'asc')
  } catch (e) {
    console.error(e);
    ElMessage.error(e instanceof Error ? e.message : '加载失败')
  } finally {
    loading.value = false
  }
}

export const formRef = ref<FormInstance>()
export function setFormRef(el: any) {
  formRef.value = el
}

export const formData = reactive<UserAddDTO & UserUpdateDTO>({
  avatar: "",
  id: "",
  nickname: "",
  parentId: "",
  password: "",
  status: 0,
  username: "",
  deptId: undefined,
  deptIdList: [],
  roleIdList: [],
})

export function handleOpened(row?: UserOutputDTO) {
  if (row) {
    Object.assign(formData, row)
  } else {
    Object.assign(formData, {
      avatar: "",
      id: "",
      nickname: "",
      parentId: "",
      password: "",
      status: 0,
      username: "",
      deptIdList: [],
      roleIdList: [],
    })
  }
  initOptions()
}

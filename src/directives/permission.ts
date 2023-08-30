import { DirectiveBinding, ObjectDirective, toRef, toRefs } from "vue";
import { useUserStore } from "@/store/system/user";


export const permission: ObjectDirective = {



  updated(el: HTMLButtonElement, binding: DirectiveBinding, vnode) {
    if (binding.value == undefined) return;

    const { action, effect, instance } = binding.value;
    console.log('v-permission binding', binding.value);
    const userStore = useUserStore();
    if (!userStore.loginState) {
      return;
    }
    const permList = userStore.loginState.permKeyList;

    if (!permList.includes(binding.value)) {
      // disabled
      el.disabled = true
      el.classList.add('is-disabled')
      // remove
      // el?.parentElement?.removeChild(el)
    }


  }
};
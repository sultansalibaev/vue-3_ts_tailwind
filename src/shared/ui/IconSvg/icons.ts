import { reactive, ref } from 'vue'

type IconType = {
    attributes: object
    svg: string
}

export const icons = reactive(ref<Record<string, IconType>>({}))
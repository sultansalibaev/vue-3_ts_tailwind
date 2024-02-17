<template>
    <svg v-bind="{...defaultSize, ...icon?.attributes}" v-html="icon?.svg"></svg>
</template>

<script setup lang="ts">
import { icons } from './icons'
import { computed, onBeforeMount, defineProps, defineOptions, PropType } from 'vue'

interface IconDefaultSize {
    width?: string | number
    height?: string | number
}

type NameProp = string

const props = defineProps({
    name: {
        type: String as PropType<NameProp>,
        required: true
    },
    defaultSize: {
        type: Object as PropType<IconDefaultSize>,
        required: false,
        default: () => ({
            width: 24,
            height: 24
        })
    }
})

defineOptions({
    name: 'icon-svg'
})

const icon = computed(() => {
    return icons.value[props.name]
})

onBeforeMount(async () => {
    if (icon.value != undefined) return
    try {
        const getSvgUrl = require(`@/shared/assets/svg/${props.name}.svg`)

        const response = await fetch(getSvgUrl)
        const svgString: string = await response.text()

        const el = document.createElement('svg')
        el.innerHTML = svgString
        const svg = el.querySelector('svg') ?? el

        const attributes = {}
        for (const attr of svg.attributes) {
            attributes[attr.name] = attr.value
        }

        if (svg.innerHTML == '' || svg.attributes.length == 0) {
            throw new Error('Empty svg error')
        }

        icons.value[props.name] = {
            svg: svg.innerHTML,
            attributes
        }
    } catch (error) {
        console.log(error)
    }
})

</script>

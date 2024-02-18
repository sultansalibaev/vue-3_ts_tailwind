<template>
    <div class="inline-flex" :class="{
        'relative overflow-hidden': onlyBg
    }">
        <img
            class="h-full select-none"
            :class="imgClass + (
                onlyBg ? ' absolute left-0 right-0 w-full object-cover object-center [&~*]:z-[1]' : ''
            )"
            :src="path ?? require(`@/shared/assets/img/${name}`)"
            :alt="alternative"
            @error="path = require(`@/shared/assets/svg/no-image.svg`)"
            loading="lazy"
        />
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'v-img',
    data () {
        const src = this.src
        return {
            path: src
        }
    },
    props: {
        src: {
            type: String,
            required: false,
            default: undefined
        },
        name: {
            type: String,
            required: false,
            default: undefined
        },
        alternative: {
            type: String,
            required: false,
            default: 'Картинка не найден!'
        },
        imgClass: {
            type: String,
            required: false,
            default: ''
        },
        onlyBg: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>
<template>
    <span class="switch" :class="{
        active: bool
    }"></span>
</template>

<script setup>
import { defineOptions, defineProps } from "vue"

defineOptions({
    name: 'v-switch'
})

defineProps({
    bool: {
        type: Boolean,
        default: false,
    }
})

</script>

<style lang="scss">

.switch {
    @apply cursor-pointer relative bg-color;
    height: 1.125em;
    width: 2.25em;
    border-radius: 1.5625em;
    &::before {
        @apply absolute bg-sidebar-color;
        content: '';
        height: 0.88em;
        width: 0.88em;
        border-radius: 50%;
        top: 50%;
        left: 0.18em;
        transform: translateY(-50%);
        transition: var(--tranision-hover);
    }
    &.active::before {
        // left: 1.2em;
        left: calc(100% - 0.88em - 0.18em);
    }
}

</style>
<template>
    <router-link :to="item?.to">
        <i class='text-[17px] mr-2.5' :class="item?.icon"></i>
        <span class="truncate">{{ item?.name }}</span>
    </router-link>
</template>

<script lang="ts">
import { PropType } from 'vue';

export default {
    name: 'sidebar-item',
    props: {
        item: {
            type: Object as PropType<Record<string, string>>,
            required: true,
        }
    },
}

</script>
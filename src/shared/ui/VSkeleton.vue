<template>
    <div class="skeleton"></div>
</template>

<script>

export default {
    name: 'v-skeleton'
}

</script>

<style lang="scss">

.skeleton {
    @apply rounded-md;

    background: var(--skeleton-bg-gradient-color);
    background-size: 200% 100%;
    animation: 1.5s shine linear infinite;
}

@keyframes shine {
    to {
        background-position-x: -200%;
    }
}

</style>
<template>
    <aside
        class="flex flex-col bg-sidebar-color py-2.5 px-3.5 w-full h-full max-w-[250px] relative text-sidebar-text-color"
        :class="{
            'closed-menu': closed
        }"
    >
        <div class="bg-image" v-if="dark_theme">
            <div class="blured-img"></div>
        </div>
        <div class="toggle" @click="toggleAside">
            <i class="bx bx-chevron-right" :class="{
                'rotate-180': !closed,
            }"></i>
        </div>
        <div class="flex items-center">
            <v-img name="logo.png" class="size-10 min-w-10 mr-3" img-class="rounded-md"/>

            <div class="truncate">
                <h6 class="">Codinglab</h6>
                <span>Web developer</span>
            </div>
        </div>

        <nav class="scrollable scrollbar-hide flex flex-col gap-1.5 h-full">
            <div class="nav-item search-box !bg-body-color" @click="showAside">
                <i class="bx bx-search text-[17px] mr-2.5 bg-body-color !text-sidebar-text-color"></i>
                <input type="text" class="!font-normal bg-body-color !text-color" placeholder="Search..." ref="search-box">
            </div>

            <sidebar-item
                v-for="(item, index) in nav"
                :key="index"
                :item="item"
                class="nav-item"
            />
        </nav>
        <div class="border-t border-switcher-color mt-auto">
            <a href="/" class="nav-item my-2.5">
                <i class='text-[17px] mr-2.5 bx bx-log-out'></i>
                <span class="truncate">Logout</span>
            </a>
            <div
                class="!bg-body-color rounded-md flex items-center truncate"
                :class="{
                    'h-9 px-2.5 justify-between': !closed,
                    'h-6 text-sm justify-center cursor-pointer': closed,
                }"
                @click="closed ? toggleDarkTheme() : false"
            >
                <template v-if="!closed">
                    <i class='text-[17px] bx bx-moon'></i>
                    <span>Default</span>
                </template>
                <v-switch
                    :bool="dark_theme"
                    :class="{
                        'text-[11px]': closed
                    }"
                    @click.stop="toggleDarkTheme"
                />
            </div>
        </div>

    </aside>
</template>

<script>
import SidebarItem from "./SidebarItem.vue"

export default {
    name: 'v-sidebar',
    components: {
        SidebarItem,
    },
    data: () => ({
        closed: false,
        dark_theme: localStorage.getItem('theme-mode') == 'dark',
        nav: [
            { icon: 'bx bx-home-alt', name: 'Main', to: '/main' },
            { icon: 'bx bx-info-circle', name: 'About', to: '/about' },
            { icon: 'bx bx-user', name: 'Profile', to: '/profile' },
            { icon: 'bx bx-news', name: 'Articles', to: '/articles' },
            // { icon: 'bx bx-bar-chart-alt', name: 'Dashboard', },
            // { icon: 'bx bx-bell', name: 'Notifications', },
            // { icon: 'bx bx-heart', name: 'Likes', },
            // { icon: 'bx bx-wallet', name: 'Wallets', },
        ]
    }),
    methods: {
        toggleAside() {
            this.closed = !this.closed;
        },
        showAside() {
            this.closed = false;
        },
        toggleDarkTheme() {
            this.dark_theme = !this.dark_theme;
            localStorage.setItem('theme-mode', this.dark_theme ? 'dark' : '')
            document.documentElement.classList.toggle('dark')
        },
    },
    created() {
        document.documentElement.className = localStorage.getItem('theme-mode') ?? ''
    },
    watch: {
        closed(bool) {
            if (!bool) this.$refs?.['search-box']?.focus?.();
        }
    },
}

</script>

<style lang="scss">

.search-box {
    @apply mt-12 mb-2.5 pr-2.5;
    input {
        @apply w-full h-full outline-none border-none text-base;
        transition: var(--tranision-hover);
    }
}

aside {
    transition: var(--tranision-theme) !important;
    .toggle {
        @apply 
            absolute top-[25px] left-[calc(100%_-_12px)]
            text-[22px] w-[25px] h-[25px] rounded-full cursor-pointer
            flex items-center justify-center bg-primary text-white;

        transition: var(--tranision-theme), border-radius .2s, width .2s, opacity .2s !important;
        i {
            transition: var(--tranision-theme);
        }
    }

    .nav-item {
        @apply 
            flex items-center pl-[10px] min-h-[35px]
            select-none rounded-md overflow-hidden cursor-pointer;

        transition: var(--tranision-hover);

        &:hover {
            background-color: var(--primary);
            color: var(--text-white);
        }

    }

    .theme {
        @apply relative rounded-md bg-body-color;
    }

    .bg-image {
        @apply absolute top-0 bottom-0 left-0 right-0 overflow-hidden;

        .blured-img {
            transition: var(--tranision-theme);
        }
    }
    .blured-img {
        @apply w-full h-full;
        background: var(--sidebar-bg);
        filter: blur(16px);
        opacity: var(--sidebar-opacity);
    }

    > *:not(.bg-image) {
        z-index: 1;
    }

    &.closed-menu {
        max-width: 65px;
        .toggle {
            @apply justify-end left-full w-9;
            border-radius: 0 15px 15px 0;
            &:not(:hover) {
                width: 25px;
                opacity: .4;
            }
        }
        .theme {
            min-height: 25px;
            & > *:not(.toggle-theme) {
                opacity: 0;
            }
        }
        .blured-img {
            filter: blur(5px);
        }
    }

}

</style>
<template>
    <aside
        class="flex flex-col bg-sidebar-color py-2.5 px-3.5 w-full h-full max-w-[250px] relative text-sidebar-text-color"
        :class="{
            'closed-menu': closed
        }"
    >
        <div class="bg-image">
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

        <nav class="scrollable hidden-scrollbar flex flex-col gap-1.5 h-full">
            <a href="#" class="nav-item search-box ignore-hover" @click="showAside">
                <i class="bx bx-search text-[17px] mr-2.5"></i>
                <input type="text" class="!font-normal" placeholder="Search..." ref="search-box">
            </a>

            <a href="#" class="nav-item" v-for="(item, index) in nav" :key="index">
                <i class='text-[17px] mr-2.5' :class="item.icon"></i>
                <span class="nav-text truncate">{{ item.name }}</span>
            </a>
        </nav>
        <div class="nav-footer mt-auto">
            <a href="#" class="nav-item my-2.5">
                <i class='text-[17px] mr-2.5 bx bx-log-out'></i>
                <span class="nav-text truncate">Logout</span>
            </a>
            <div class="nav-item ignore-hover theme truncate" @click="toggleDarkTheme">
                <div class="sun-moon">
                    <i class='text-[17px] mr-2.5 bx bx-moon moon'></i>
                    <i class='text-[17px] mr-2.5 bx bx-sun sun'></i>
                </div>
                <span class="theme-text">Default</span>

                <div class="toggle-theme">
                    <span class="switch"></span>
                </div>
            </div>
        </div>

    </aside>
</template>

<script>

export default {
    name: 'v-sidebar',
    data: () => ({
        closed: false,
        dark_theme: localStorage.getItem('theme-mode') == 'dark',
        nav: [
            { icon: 'bx bx-home-alt', name: 'Main', },
            { icon: 'bx bx-info-circle', name: 'About', },
            { icon: 'bx bx-user', name: 'Profile', },
            { icon: 'bx bx-news', name: 'Articles', },
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
    mounted() {
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
    @apply mt-12 mb-2.5 pr-2.5 bg-body-color;
    input {
        @apply w-full h-full outline-none border-none bg-body-color text-color text-base;
        transition: var(--tran-04);
    }
}

aside {
    .toggle {
        @apply 
            absolute top-[25px] left-[calc(100%_-_12px)]
            text-[22px] w-[25px] h-[25px] rounded-full cursor-pointer
            flex items-center justify-center bg-primary text-white;
    }

    &.closed-menu {
        max-width: 65px;
        .toggle {
            justify-content: end;
            width: 35px;
            border-radius: 0 15px 15px 0;
            left: 100%;
            &:not(:hover) {
                width: 25px;
                opacity: .4;
            }
        }
    }
}

.nav-footer {
    border-top: 1px solid var(--switcher-color);
}

</style>
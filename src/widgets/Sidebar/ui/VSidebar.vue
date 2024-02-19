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
            flex items-center
            select-none pl-[10px] rounded-md overflow-hidden cursor-pointer min-h-[35px];

        transition: var(--tran-04);

        &:not(.ignore-hover):hover {
            background-color: var(--primary);
            * {
                color: var(--text-white);
            }
        }

    }
    .text,
    .icon {
        transition: var(--tran-04);
    }

    .theme {
        border-radius: 6px;
        background-color: var(--body-color);
        position: relative;
        &:hover {
            background-color: var(--body-color);
            * {
                color: var(--text-color);
            }
        }

        .sun-moon {
            height: 17px;
            width: 60px;
            i {
                position: absolute;
                &.sun {
                    opacity: 0;
                }
            }
        }
    }

    .bg-image {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;

        transition: var(--tranision-theme);
        * {
            transition: var(--tranision-theme);
        }
    }
    .blured-img {
        background: url(https://img.freepik.com/premium-photo/a-black-background-with-a-pile-of-rocks-and-the-words-coal-on-it_900321-20773.jpg?w=826) 0 0/250px auto repeat-y;
        background: var(--sidebar-bg);
        filter: blur(16px);
        width: 100%;
        height: 100%;
        opacity: var(--sidebar-opacity);
    }

    > *:not(.bg-image) {
        z-index: 1;
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

    &:not(.closed-menu) .nav-footer .toggle-theme {
        margin-right: .75em;
    }
}

.nav-footer {
    border-top: 1px solid var(--switcher-color);
}
.toggle-theme {
    font-size: 13px;
    position: absolute;
    right: 0;
    height: 100%;
    min-width: 3em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.375em;
    cursor: pointer;
}

// ===============================================================================================

.toggle-theme .switch {
    position: relative;
    height: 1.125em;
    width: 2.25em;
    border-radius: 1.5625em;
    background-color: var(--text-color);
}

.switch::before {
    content: '';
    position: absolute;
    height: 0.88em;
    width: 0.88em;
    border-radius: 50%;
    top: 50%;
    left: 0.18em;
    transform: translateY(-50%);
    background-color: var(--sidebar-color);
    transition: var(--tran-04);
}

html.dark .switch::before {
    left: 1.2em;
}

</style>
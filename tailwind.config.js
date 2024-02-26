/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            screens: {
                'mobile-screen': '480px', // Adjust the breakpoint as needed
            },
            colors: {
                color: 'var(--text-color)',
                'white-color': 'var(--white-color)',
                primary: 'var(--primary)',
                'body-color': 'var(--body-color)',
                'sidebar-color': 'var(--sidebar-color)',
                'block-color': 'var(--block-color)',
                'sidebar-text-color': 'var(--sidebar-text-color)',
                'switcher-color': 'var(--switcher-color)',
                'profile-color': 'var(--profile-color)',

                'dots-color': 'var(--dots-color)',
                'dots-bg': 'var(--dots-bg)',
                'dots-border': 'var(--dots-border)',
            },
            // transitions: {
            //     hover: 'var(--tranision-hover)',
            //     theme: 'var(--tranision-theme)',
            // },
        },
    },
    plugins: []
}

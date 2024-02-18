const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/doclub-tv-production/' : '/',

  css: {
    loaderOptions: {
      sass: {
        // предполагается, что у вас установлены sass и sass-loader
        implementation: require('sass'),
        sassOptions: {
          indentedSyntax: false, // false для SCSS, true для SASS
        },
      },
    },
  },
})

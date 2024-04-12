import { createApp } from 'vue'
import App from './App.vue'
import router from './app/router'
import directives from './app/directives'
import UIComponents from './shared/ui'
import './shared/assets/tailwind.scss'
import i18n from "./translate"

const app = createApp(App)

UIComponents.forEach(UIComponent => {
    app.component(UIComponent.name, UIComponent);
});

directives.forEach(directive => {
    app.directive(directive.name, directive);
});

// @ts-ignore
// Vue.prototype.$i18nRoute = Trans.i18nRoute.bind(Trans)
app.use(router)
app.use(i18n)
app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './app/router'
import directives from './app/directives'
import UIComponents from './shared/ui'
import './shared/assets/tailwind.css'

const app = createApp(App)

UIComponents.forEach(UIComponent => {
    app.component(UIComponent.name, UIComponent);
});

directives.forEach(directive => {
    app.directive(directive.name, directive);
});

app.use(router)
app.mount('#app')

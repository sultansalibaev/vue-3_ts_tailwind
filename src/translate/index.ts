import { createI18n, VueI18n } from 'vue-i18n';

// Import message catalogs
import en from './en.json';
import ru from './ru.json';

export default createI18n({
    legacy: true,
    globalInjection: true,
    locale: process.env.VUE_APP_I18N_LOCALE || "ru",
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "ru",
    messages: { en, ru },
});

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from '@/app/translations/resources'; // Імпортуємо переклади

i18n.use(initReactI18next).init({
    resources,
    lng: 'en', // Мова за замовчуванням
    fallbackLng: 'en', // Запасна мова
    interpolation: {
        escapeValue: false, // React автоматично екранує
    },
});

export default i18n;
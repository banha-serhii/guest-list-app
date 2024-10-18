import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // Переконуємося, що компонент змонтований
    }, []);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        router.push(router.pathname, router.asPath, { locale: lng });
    };

    if (!mounted) return null; // Чекаємо, доки компонент змонтується

    return (
        <div className="language-switcher">
            <button onClick={() => changeLanguage('en')} className="mr-2">EN</button>
            <button onClick={() => changeLanguage('uk')}>UA</button>
        </div>
    );
};

export default LanguageSwitcher;
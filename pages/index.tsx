"use client"; // Додаємо директиву для клієнтського компонента

import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Використовуємо новий хук із next/navigation
import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import AddGuestForm from '../components/AddGuestForm';
import GuestList from '../components/GuestList';
import { useLocalStorageGuests } from '../hooks/useLocalStorageGuests';
import ThemeToggle from '../components/ThemeToggle';

type Props = {
    // Add custom props here
};

const Homepage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter(); // Новий хук із next/navigation
    const { t } = useTranslation('common');
    const { guests, addGuest, togglePlusOne, editGuest, deleteGuest } = useLocalStorageGuests();

    const changeTo = router.locale === 'en' ? 'uk' : 'en';

    return (
        <>
            <Header heading={t('h1')} title={t('title')} />
            <main>
                <ThemeToggle />
                <AddGuestForm onAdd={addGuest} />
                <GuestList guests={guests} onTogglePlusOne={togglePlusOne} onDelete={deleteGuest} onEdit={editGuest} />
                <div>
                    <Link href="/" locale={changeTo}>
                        <button>{t('change-locale', { changeTo })}</button>
                    </Link>
                </div>
            </main>
            <Footer />
        </>
    );
};

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'en', ['common', 'footer'])),
    },
});

export default Homepage;
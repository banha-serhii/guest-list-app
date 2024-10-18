"use client";

import React, { useEffect, useRef, useState } from 'react';
import GuestCard from './GuestCard';
import { Guest } from '../hooks/useLocalStorageGuests';
import { useTranslation } from 'react-i18next';
import { TwitterShareButton, TelegramShareButton, TwitterIcon, TelegramIcon } from 'react-share';
import { toPng } from 'html-to-image';

interface GuestListProps {
    guests: Guest[];
    onTogglePlusOne: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newName: string) => void;
}

const GuestList: React.FC<GuestListProps> = ({
                                                 guests = [],
                                                 onTogglePlusOne,
                                                 onDelete,
                                                 onEdit,
                                             }) => {
    const { t } = useTranslation(); // Підключаємо переклади
    const [shareUrl, setShareUrl] = useState<string>('');
    const guestListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setShareUrl(window.location.href);
        }
    }, []);

    const totalGuests = guests.reduce((total, guest) => total + (guest.plusOne ? 2 : 1), 0);
    const guestNames = guests.map(guest => guest.name).join(',\n');

    const handleDownloadImage = async () => {
        if (guestListRef.current) {
            const dataUrl = await toPng(guestListRef.current);
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'guest-list.png';
            link.click();
        }
    };

    return (
        <div className="flex flex-col min-h-screen justify-between">
            <div>
                <h3 className="text-xl font-semibold mb-4 dark:text-white">
                    {guests.length > 0 ? t('total_guests', { count: guests.length }) : t('no_guests')}
                </h3>

                <div ref={guestListRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 e p-4 shadow rounded">
                    {guests.length > 0 ? (
                        guests.map((guest) => (
                            <GuestCard
                                key={guest.id}
                                guest={guest}
                                onTogglePlusOne={onTogglePlusOne}
                                onDelete={onDelete}
                                onEdit={onEdit}
                            />
                        ))
                    ) : (
                        <div className="text-center text-gray-500 dark:text-gray-300">
                            {t('no_guests_yet')}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-center space-x-4 mt-4 mb-4">
                <TwitterShareButton url={`Made with ${shareUrl}`} title={`Total guests: ${totalGuests};\nMy guest list:\n${guestNames},`}>
                    <TwitterIcon />
                </TwitterShareButton>
                <TelegramShareButton url={`Made with ${shareUrl}`} title={`Total guests: ${totalGuests};\nMy guest list:\n${guestNames},`}>
                    <TelegramIcon />
                </TelegramShareButton>
                <button onClick={handleDownloadImage} className="bg-green-600 text-white py-2 px-4 rounded">
                    {t('download_image')}
                </button>
            </div>
        </div>
    );
};

export default GuestList;
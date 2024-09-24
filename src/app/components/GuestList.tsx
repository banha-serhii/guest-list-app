"use client";

import React, {useEffect, useRef, useState} from 'react';
import GuestCard from './GuestCard';
import {Guest} from '../hooks/useLocalStorageGuests';
import {
    // FacebookShareButton,
    TwitterShareButton, TelegramShareButton, TwitterIcon, TelegramIcon
} from 'react-share';
import {toPng} from 'html-to-image';

interface GuestListProps {
    guests: Guest[];
    onTogglePlusOne: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newName: string) => void;
    updateGuestsOrder: (updatedGuests: Guest[]) => void;
}

const GuestList: React.FC<GuestListProps> = ({
                                                 guests = [],
                                                 onTogglePlusOne,
                                                 onDelete,
                                                 onEdit,
                                             }) => {
    const [shareUrl, setShareUrl] = useState(''); // Створюємо стан для зберігання URL
    const guestListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setShareUrl(window.location.href);
        }
    }, []);
    const totalGuests = guests.reduce((total, guest) => total + (guest.plusOne ? 2 : 1), 0);

    const guestNames = guests.map(guest => guest.name).join(',\n ');

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
        <div>
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Total Guests: {totalGuests}</h3>

            <div className="flex space-x-4 mb-4">
                {/*<FacebookShareButton url={shareUrl} title={`My guest list: ${guestNames}`}>*/}
                {/*    <span className="bg-blue-600 text-white py-2 px-4 rounded">Share on Facebook</span>*/}
                {/*</FacebookShareButton>*/}
                <TwitterShareButton url={shareUrl}
                                    title={`Total guests: ${totalGuests}\nMy guest list:\n${guestNames}`}>
                    <TwitterIcon/>
                </TwitterShareButton>
                <TelegramShareButton url={shareUrl}
                                     title={`Total guests: ${totalGuests}\nMy guest list:\n${guestNames}`}>
                    <TelegramIcon/>
                </TelegramShareButton>
                <button
                    onClick={handleDownloadImage}
                    className="bg-green-600 text-white py-2 px-4 rounded"
                >
                    Download Image
                </button>
            </div>

            <div ref={guestListRef} className="grid grid-cols-2 sm:grid-cols-2 gap-4  p-4 shadow rounded">
                {guests.map((guest) => (
                    <GuestCard
                        key={guest.id}
                        guest={guest}
                        onTogglePlusOne={onTogglePlusOne}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))}
            </div>
        </div>
    );
};

export default GuestList;

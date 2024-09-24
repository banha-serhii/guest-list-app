"use client";

import React, { useRef } from 'react';
import GuestCard from './GuestCard';
import { Guest } from '../hooks/useLocalStorageGuests';
import {
    // FacebookShareButton,
    TwitterShareButton, TelegramShareButton } from 'react-share';
import { toPng } from 'html-to-image';

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
    const totalGuests = guests.reduce((total, guest) => total + (guest.plusOne ? 2 : 1), 0);

    const guestListRef = useRef<HTMLDivElement>(null);


    const shareUrl = window.location.href;
    const guestNames = guests.map(guest => guest.name).join(', ');

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
                {/*    <button className="bg-blue-600 text-white py-2 px-4 rounded">Share on Facebook</button>*/}
                {/*</FacebookShareButton>*/}
                <TwitterShareButton url={shareUrl} title={`My guest list: ${guestNames}`}>
                    <button className="bg-blue-400 text-white py-2 px-4 rounded">Share on Twitter</button>
                </TwitterShareButton>
                <TelegramShareButton url={shareUrl} title={`My guest list: ${guestNames}`}>
                    <button className="bg-blue-700 text-white py-2 px-4 rounded">Share on Telegram</button>
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

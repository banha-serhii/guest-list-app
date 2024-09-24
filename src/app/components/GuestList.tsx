"use client";

import React from 'react';
import GuestCard from './GuestCard';
import { Guest } from '../hooks/useLocalStorageGuests';
import {
    // FacebookShareButton,
    TwitterShareButton, TelegramShareButton } from 'react-share';

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

    const shareUrl = window.location.href; // Генеруємо URL для поточної сторінки
    const guestNames = guests.map(guest => guest.name).join(', '); // Створюємо список імен гостей

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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

"use client";

import React from 'react';
import GuestCard from './GuestCard';
import { Guest } from '../hooks/useLocalStorageGuests';

interface GuestListProps {
    guests: Guest[];
    onTogglePlusOne: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newName: string) => void;
}

const GuestList: React.FC<GuestListProps> = ({ guests, onTogglePlusOne, onDelete, onEdit }) => {
    const totalGuests = guests.reduce((total, guest) => total + (guest.plusOne ? 2 : 1), 0);

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Total Guests: {totalGuests}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

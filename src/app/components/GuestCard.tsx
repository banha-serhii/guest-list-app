"use client";

import React, { useState } from 'react';
import { Guest } from '../hooks/useLocalStorageGuests';
import EditIcon from './EditIcon';
import ActionButtons from './ActionButtons';

interface GuestCardProps {
    guest: Guest;
    onTogglePlusOne: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newName: string) => void;
}

const GuestCard: React.FC<GuestCardProps> = ({ guest, onTogglePlusOne, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(guest.name);

    const handleSave = () => {
        if (editName.trim()) {
            onEdit(guest.id, editName.trim());
            setIsEditing(false);
        } else {
            alert("Name cannot be empty.");
        }
    };

    return (
        <div className="relative p-4 pr-8 bg-white dark:bg-gray-800 dark:text-white shadow rounded">
            <EditIcon onClick={() => setIsEditing(!isEditing)} />
            {isEditing ? (
                <input
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-2 bg-white dark:bg-gray-700"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                />
            ) : (
                <h4 className="text-lg font-semibold">{guest.name}</h4>
            )}
            <div className="flex items-center mt-2">
                <input
                    type="checkbox"
                    checked={guest.plusOne}
                    onChange={() => onTogglePlusOne(guest.id)}
                    className="mr-2"
                />
                <span>+1</span>
            </div>
            {isEditing && (
                <ActionButtons onSave={handleSave} onDelete={() => onDelete(guest.id)} />
            )}
        </div>
    );
};

export default GuestCard;
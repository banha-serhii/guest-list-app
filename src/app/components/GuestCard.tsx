"use client";

import React, { useState } from 'react';
import { Guest } from '../hooks/useLocalStorageGuests';

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
        <div className="p-4 bg-white dark:bg-gray-800 dark:text-white shadow rounded">
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
            <div className="mt-4 flex space-x-2">
                {isEditing ? (
                    <button
                        onClick={handleSave}
                        className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
                    >
                        Save
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-yellow-500 text-white py-1 px-4 rounded hover:bg-yellow-600"
                    >
                        Edit
                    </button>
                )}
                <button
                    onClick={() => onDelete(guest.id)}
                    className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default GuestCard;

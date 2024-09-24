"use client";

import React, { useState } from 'react';

interface AddGuestFormProps {
    onAdd: (name: string) => void;
}

const AddGuestForm: React.FC<AddGuestFormProps> = ({ onAdd }) => {
    const [guestName, setGuestName] = useState('');

    const handleSubmit = () => {
        if (guestName.trim()) {
            onAdd(guestName.trim());
            setGuestName('');
        } else {
            alert("Please enter the guest's name.");
        }
    };

    return (
        <div className="flex flex-col mb-4">
            <input
                type="text"
                className="p-2 border border-gray-300 dark:border-gray-600 rounded mb-2 bg-white dark:bg-gray-800 dark:text-white"
                placeholder="Guest name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSubmit();
                    }
                }}
            />
            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Add Guest
            </button>
        </div>
    );
};

export default AddGuestForm;

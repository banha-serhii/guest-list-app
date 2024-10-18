"use client";

import React from 'react';

interface ActionButtonsProps {
    onSave: () => void;
    onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onSave, onDelete }) => {
    return (
        <div className="mt-4 flex space-x-2">
            <button
                onClick={onSave}
                className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
            >
                Save
            </button>
            <button
                onClick={onDelete}
                className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
            >
                Delete
            </button>
        </div>
    );
};

export default ActionButtons;
"use client";

import React from 'react';
import { FaEdit } from 'react-icons/fa';

interface EditIconProps {
    onClick: () => void;
}

const EditIcon: React.FC<EditIconProps> = ({ onClick }) => {
    return (
        <div className="absolute top-2 right-2 cursor-pointer" onClick={onClick}>
            <FaEdit className="text-gray-600 dark:text-gray-400 hover:text-gray-900" />
        </div>
    );
};

export default EditIcon;
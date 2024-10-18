"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { SunIcon, MoonIcon } from '@heroicons/react/outline';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Використовуємо useEffect для того, щоб переконатися, що компонент змонтований на клієнті
    useEffect(() => {
        setMounted(true);
    }, []);

    // Якщо компонент ще не змонтований, не показуємо іконки
    if (!mounted) {
        return null;
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <SunIcon className="w-6 h-6 text-yellow-400" />  // Іконка сонця для темної теми
            ) : (
                <MoonIcon className="w-6 h-6 text-yellow-500" />  // Іконка місяця для світлої теми
            )}
        </button>
    );
};

export default ThemeToggle;

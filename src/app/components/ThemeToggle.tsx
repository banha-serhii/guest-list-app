"use client"; // Компонент клієнтського рендеру

import React from 'react';
import {useTheme} from '../hooks/useTheme';

const ThemeToggle: React.FC = () => {
    const {theme, toggleTheme} = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded"
        >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
};

export default ThemeToggle;

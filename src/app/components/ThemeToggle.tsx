"use client";

import React from 'react';
import {useTheme} from '../hooks/useTheme';

const ThemeToggle: React.FC = () => {
    const {theme, toggleTheme} = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <div>
                    <span>Dark mode</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-yellow-400"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 2a1 1 0 01.894.553l1.618 3.24 3.58.52a1 1 0 01.554 1.706l-2.589 2.525.611 3.567a1 1 0 01-1.45 1.054L12 15.58l-3.204 1.684a1 1 0 01-1.45-1.054l.611-3.567L5.367 8.02a1 1 0 01.554-1.706l3.58-.52L11.106 2.55A1 1 0 0112 2z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            ) : (
                <div>
                    <span>Light Mode</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-yellow-500"
                    >
                        <path
                            d="M21.752 15.002A9.718 9.718 0 0112 22c-5.388 0-9.751-4.363-9.751-9.751 0-4.7 3.292-8.616 7.75-9.577a.75.75 0 01.927.728c0 .482-.07.963-.209 1.43A7.482 7.482 0 0012 19.5a7.482 7.482 0 006.17-3.27 7.485 7.485 0 003.62-1.13.75.75 0 01.962.452z"
                        />
                    </svg>
                </div>

            )}
        </button>
    );
};

export default ThemeToggle;

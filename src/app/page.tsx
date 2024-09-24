"use client";

import React from 'react';
import AddGuestForm from './components/AddGuestForm';
import GuestList from './components/GuestList';
import { useLocalStorageGuests, Guest } from './hooks/useLocalStorageGuests';
import ThemeToggle from './components/ThemeToggle';

const Home: React.FC = () => {
    const { guests, addGuest, togglePlusOne, editGuest, deleteGuest, setGuests } = useLocalStorageGuests();

    const updateGuestsOrder = (updatedGuests: Guest[]) => {
        setGuests(updatedGuests);  // Оновлюємо порядок гостей і зберігаємо у localStorage
    };

    return (
        <div className="container mx-auto p-4 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold dark:text-white">Birthday Guest List</h1>
                <ThemeToggle />
            </div>
            <AddGuestForm onAdd={addGuest} />
            <GuestList
                guests={guests}
                onTogglePlusOne={togglePlusOne}
                onDelete={deleteGuest}
                onEdit={editGuest}
                updateGuestsOrder={updateGuestsOrder}  // Передаємо функцію для оновлення порядку
            />
        </div>
    );
};

export default Home;

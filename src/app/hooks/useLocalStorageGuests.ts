import { useState, useEffect } from 'react';

export interface Guest {
  id: string;
  name: string;
  plusOne: boolean;
}

const GUESTS_KEY = 'guest_list';

export const useLocalStorageGuests = () => {
  const [guests, setGuests] = useState<Guest[]>([]);

  useEffect(() => {
    const storedGuests = localStorage.getItem(GUESTS_KEY);
    if (storedGuests) {
      setGuests(JSON.parse(storedGuests));
    }
  }, []);

  const saveGuests = (updatedGuests: Guest[]) => {
    setGuests(updatedGuests);
    localStorage.setItem(GUESTS_KEY, JSON.stringify(updatedGuests));
  };

  const addGuest = (name: string) => {
    const newGuest: Guest = {
      id: Date.now().toString(),
      name,
      plusOne: false,
    };
    saveGuests([...guests, newGuest]);
  };

  const togglePlusOne = (id: string) => {
    const updatedGuests = guests.map((guest) =>
        guest.id === id ? { ...guest, plusOne: !guest.plusOne } : guest
    );
    saveGuests(updatedGuests);
  };

  const editGuest = (id: string, newName: string) => {
    const updatedGuests = guests.map((guest) =>
        guest.id === id ? { ...guest, name: newName } : guest
    );
    saveGuests(updatedGuests);
  };

  const deleteGuest = (id: string) => {
    const updatedGuests = guests.filter((guest) => guest.id !== id);
    saveGuests(updatedGuests);
  };

  return { guests, addGuest, togglePlusOne, editGuest, deleteGuest, setGuests };
};

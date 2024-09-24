"use client";

import React from 'react';
import GuestCard from './GuestCard';
import { Guest } from '../hooks/useLocalStorageGuests';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface GuestListProps {
    guests: Guest[];
    onTogglePlusOne: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newName: string) => void;
    updateGuestsOrder: (updatedGuests: Guest[]) => void;
}

const GuestList: React.FC<GuestListProps> = ({
                                                 guests,
                                                 onTogglePlusOne,
                                                 onDelete,
                                                 onEdit,
                                                 updateGuestsOrder,
                                             }) => {
    const totalGuests = guests.reduce((total, guest) => total + (guest.plusOne ? 2 : 1), 0);

    // Використовуємо DropResult для типізації
    const handleOnDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const updatedGuests = Array.from(guests);
        const [reorderedGuest] = updatedGuests.splice(result.source.index, 1);
        updatedGuests.splice(result.destination.index, 0, reorderedGuest);

        updateGuestsOrder(updatedGuests);
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Total Guests: {totalGuests}</h3>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="guests">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                            {guests.map((guest, index) => (
                                <Draggable key={guest.id} draggableId={guest.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <GuestCard
                                                guest={guest}
                                                onTogglePlusOne={onTogglePlusOne}
                                                onDelete={onDelete}
                                                onEdit={onEdit}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default GuestList;

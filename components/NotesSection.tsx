
import React from 'react';

interface NotesSectionProps {
    title: string;
    notes: string;
    setNotes: (notes: string) => void;
    placeholder: string;
}

export const NotesSection: React.FC<NotesSectionProps> = ({ title, notes, setNotes, placeholder }) => {
    return (
        <div>
            <label htmlFor={`${title.replace(/\s/g, '-')}-notes`} className="block mb-2 font-bold text-dark">{title}:</label>
            <textarea
                id={`${title.replace(/\s/g, '-')}-notes`}
                rows={4}
                placeholder={placeholder}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
        </div>
    );
};

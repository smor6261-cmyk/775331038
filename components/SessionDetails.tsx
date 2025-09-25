
import React from 'react';
import type { CouncilData } from '../types';

interface SessionDetailsProps {
    data: CouncilData;
    setData: React.Dispatch<React.SetStateAction<CouncilData>>;
}

export const SessionDetails: React.FC<SessionDetailsProps> = ({ data, setData }) => {
    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="council-number-input" className="block mb-1 font-bold text-dark">رقم المجلس:</label>
                <input
                    type="number"
                    id="council-number-input"
                    min="1"
                    value={data.number}
                    onChange={(e) => setData({ ...data, number: parseInt(e.target.value, 10) || 1 })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
            </div>
            <div>
                <label htmlFor="council-date" className="block mb-1 font-bold text-dark">تاريخ المجلس:</label>
                <input
                    type="date"
                    id="council-date"
                    value={data.date}
                    onChange={(e) => setData({ ...data, date: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
            </div>
        </div>
    );
};

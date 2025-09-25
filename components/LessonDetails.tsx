
import React from 'react';
import type { LessonData } from '../types';

interface LessonDetailsProps {
    data: LessonData;
    setData: React.Dispatch<React.SetStateAction<LessonData>>;
}

export const LessonDetails: React.FC<LessonDetailsProps> = ({ data, setData }) => {
    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="lesson-title-input" className="block mb-1 font-bold text-dark">عنوان الدرس:</label>
                <input
                    type="text"
                    id="lesson-title-input"
                    placeholder="أدخل عنوان الدرس"
                    value={data.title}
                    onChange={(e) => setData({ ...data, title: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
            </div>
            <div>
                <label htmlFor="lesson-details" className="block mb-1 font-bold text-dark">تفاصيل الدرس:</label>
                <textarea
                    id="lesson-details"
                    rows={3}
                    placeholder="أدخل تفاصيل الدرس"
                    value={data.details}
                    onChange={(e) => setData({ ...data, details: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
            </div>
        </div>
    );
};

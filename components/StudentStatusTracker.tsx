
import React from 'react';
import type { Student, StatusRecord, StatusOption } from '../types';

interface StudentStatusTrackerProps {
    students: Student[];
    data: StatusRecord[];
    setData: React.Dispatch<React.SetStateAction<StatusRecord[]>>;
    options: StatusOption[];
    councilDate: string;
}

export const StudentStatusTracker: React.FC<StudentStatusTrackerProps> = ({ students, data, setData, options, councilDate }) => {
    
    const setStatus = (studentId: string, status: string) => {
        const existingIndex = data.findIndex(d => d.studentId === studentId && d.date === councilDate);
        
        let newData = [...data];
        if (existingIndex !== -1) {
            newData[existingIndex] = { ...newData[existingIndex], status };
        } else {
            newData.push({ studentId, date: councilDate, status });
        }
        setData(newData);
    };

    if (students.length === 0) {
        return <p className="text-center text-gray-500">لا توجد طالبات مسجلات بعد</p>;
    }
    
    return (
        <div className="space-y-2">
            {students.map(student => {
                const currentStatus = data.find(d => d.studentId === student.id && d.date === councilDate)?.status;
                return (
                    <div key={student.id} className="p-2 bg-gray-50 rounded-lg border">
                        <strong className="block mb-2 text-dark">{student.name}</strong>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {options.map(option => (
                                <button
                                    key={option.value}
                                    onClick={() => setStatus(student.id, option.value)}
                                    className={`w-full text-white py-2 px-1 rounded-md text-sm transition ${option.className} ${currentStatus === option.value ? 'ring-2 ring-offset-2 ring-blue-500' : 'opacity-80 hover:opacity-100'}`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

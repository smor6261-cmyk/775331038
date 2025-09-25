
import React from 'react';
import type { Student, StatusRecord, StatusOption } from '../types';
import { ATTENDANCE_OPTIONS, RECITATION_OPTIONS, HOMEWORK_OPTIONS, RESEARCH_OPTIONS } from '../constants';

interface StudentTrackerCardProps {
    student: Student;
    councilDate: string;
    attendanceData: StatusRecord[];
    setAttendanceData: React.Dispatch<React.SetStateAction<StatusRecord[]>>;
    recitationData: StatusRecord[];
    setRecitationData: React.Dispatch<React.SetStateAction<StatusRecord[]>>;
    homeworkData: StatusRecord[];
    setHomeworkData: React.Dispatch<React.SetStateAction<StatusRecord[]>>;
    researchData: StatusRecord[];
    setResearchData: React.Dispatch<React.SetStateAction<StatusRecord[]>>;
}

interface StatusRowProps {
    label: string;
    options: StatusOption[];
    currentStatus: string | undefined;
    onSetStatus: (status: string) => void;
}

const StatusRow: React.FC<StatusRowProps> = ({ label, options, currentStatus, onSetStatus }) => {
    return (
        <div className="grid grid-cols-5 gap-2 items-center py-2 border-b last:border-b-0">
            <strong className="col-span-1 text-sm text-dark">{label}:</strong>
            <div className="col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {options.map(option => (
                    <button
                        key={option.value}
                        onClick={() => onSetStatus(option.value)}
                        className={`w-full text-white py-2 px-1 rounded-md text-xs transition ${option.className} ${currentStatus === option.value ? 'ring-2 ring-offset-2 ring-blue-500' : 'opacity-80 hover:opacity-100'}`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export const StudentTrackerCard: React.FC<StudentTrackerCardProps> = ({
    student,
    councilDate,
    attendanceData, setAttendanceData,
    recitationData, setRecitationData,
    homeworkData, setHomeworkData,
    researchData, setResearchData
}) => {
    const createStatusSetter = (
        data: StatusRecord[],
        setData: React.Dispatch<React.SetStateAction<StatusRecord[]>>
    ) => (status: string) => {
        const existingIndex = data.findIndex(d => d.studentId === student.id && d.date === councilDate);
        let newData = [...data];
        if (existingIndex !== -1) {
            newData[existingIndex] = { ...newData[existingIndex], status };
        } else {
            newData.push({ studentId: student.id, date: councilDate, status });
        }
        setData(newData);
    };

    const getStatus = (data: StatusRecord[]) => {
        return data.find(d => d.studentId === student.id && d.date === councilDate)?.status;
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
            <div className="p-4 bg-gray-50 border-b">
                <h3 className="text-lg font-bold text-primary">{student.name}</h3>
                <p className="text-sm text-gray-500">({student.age} سنة) - مسجلة منذ: {student.registrationDate}</p>
            </div>
            <div className="p-4">
                <StatusRow 
                    label="الحضور" 
                    options={ATTENDANCE_OPTIONS} 
                    currentStatus={getStatus(attendanceData)}
                    onSetStatus={createStatusSetter(attendanceData, setAttendanceData)}
                />
                <StatusRow 
                    label="التسميع" 
                    options={RECITATION_OPTIONS} 
                    currentStatus={getStatus(recitationData)}
                    onSetStatus={createStatusSetter(recitationData, setRecitationData)}
                />
                <StatusRow 
                    label="الواجبات" 
                    options={HOMEWORK_OPTIONS} 
                    currentStatus={getStatus(homeworkData)}
                    onSetStatus={createStatusSetter(homeworkData, setHomeworkData)}
                />
                <StatusRow 
                    label="البحوث" 
                    options={RESEARCH_OPTIONS} 
                    currentStatus={getStatus(researchData)}
                    onSetStatus={createStatusSetter(researchData, setResearchData)}
                />
            </div>
        </div>
    );
};

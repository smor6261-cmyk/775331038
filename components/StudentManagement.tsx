
import React from 'react';
import type { Student } from '../types';

interface StudentManagementProps {
    students: Student[];
    onAddStudent: () => void;
    onEditStudent: (student: Student) => void;
    onDeleteStudent: (studentId: string) => void;
}

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);


export const StudentManagement: React.FC<StudentManagementProps> = ({ students, onAddStudent, onEditStudent, onDeleteStudent }) => {
    return (
        <div>
            <button
                onClick={onAddStudent}
                className="w-full flex items-center justify-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition duration-300 mb-4"
            >
                <PlusIcon />
                إضافة طالبة جديدة
            </button>
            <div className="space-y-3">
                {students.length === 0 ? (
                    <p className="text-center text-gray-500">لا توجد طالبات مسجلات بعد</p>
                ) : (
                    students.map(student => (
                        <div key={student.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                            <div>
                                <strong className="text-dark">{student.name}</strong>
                                <p className="text-sm text-gray-500">({student.age} سنة) - مسجلة منذ: {student.registrationDate}</p>
                            </div>
                            <div className="flex space-x-2 space-x-reverse">
                                <button
                                    onClick={() => onEditStudent(student)}
                                    className="bg-yellow-400 text-dark py-1 px-3 rounded-md text-sm hover:bg-yellow-500 transition"
                                >
                                    تعديل
                                </button>
                                <button
                                    onClick={() => onDeleteStudent(student.id)}
                                    className="bg-danger text-white py-1 px-3 rounded-md text-sm hover:bg-red-600 transition"
                                >
                                    حذف
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

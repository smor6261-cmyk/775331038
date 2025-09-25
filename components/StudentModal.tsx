
import React, { useState, useEffect } from 'react';
import type { Student } from '../types';

interface StudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (student: Student) => void;
    student: Student | null;
}

export const StudentModal: React.FC<StudentModalProps> = ({ isOpen, onClose, onSave, student }) => {
    const [formData, setFormData] = useState<Omit<Student, 'id'>>({
        name: '',
        age: 20,
        registrationDate: new Date().toISOString().split('T')[0],
        vacations: ''
    });

    useEffect(() => {
        if (student) {
            setFormData({
                name: student.name,
                age: student.age,
                registrationDate: student.registrationDate,
                vacations: student.vacations
            });
        } else {
            setFormData({
                name: '',
                age: 20,
                registrationDate: new Date().toISOString().split('T')[0],
                vacations: ''
            });
        }
    }, [student, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'age' ? parseInt(value, 10) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: student?.id || '' });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-full overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-bold text-primary">{student ? 'تعديل بيانات الطالبة' : 'إضافة طالبة جديدة'}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label htmlFor="student-name" className="block mb-1 font-bold text-dark">اسم الطالبة:</label>
                        <input type="text" id="student-name" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                        <label htmlFor="student-age" className="block mb-1 font-bold text-dark">العمر:</label>
                        <input type="number" id="student-age" name="age" value={formData.age} onChange={handleChange} min="10" max="80" className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                        <label htmlFor="student-registration-date" className="block mb-1 font-bold text-dark">تاريخ التسجيل:</label>
                        <input type="date" id="student-registration-date" name="registrationDate" value={formData.registrationDate} onChange={handleChange} className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                        <label htmlFor="student-vacations" className="block mb-1 font-bold text-dark">الإجازات الحاصلة عليها:</label>
                        <textarea id="student-vacations" name="vacations" value={formData.vacations} onChange={handleChange} rows={2} placeholder="أدخل الإجازات الحاصلة عليها" className="w-full p-2 border rounded-lg" />
                    </div>
                    <div className="flex justify-start pt-4">
                        <button type="submit" className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-secondary transition">حفظ</button>
                        <button type="button" onClick={onClose} className="bg-gray-200 text-dark py-2 px-6 rounded-lg hover:bg-gray-300 transition mr-2">إلغاء</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

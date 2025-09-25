
import React from 'react';
import type { Student, StatusRecord } from '../types';

interface ReportsProps {
    students: Student[];
    attendanceData: StatusRecord[];
    recitationData: StatusRecord[];
    homeworkData: StatusRecord[];
    researchData: StatusRecord[];
    onShowReport: (title: string, content: string) => void;
}

export const Reports: React.FC<ReportsProps> = ({ students, attendanceData, onShowReport }) => {

    const generateAttendanceReport = () => {
        if (students.length === 0) {
            onShowReport('تقرير الحضور', '<p>لا توجد بيانات لعرضها.</p>');
            return;
        }

        let content = '<ul>';
        students.forEach(student => {
            const studentAttendance = attendanceData.filter(a => a.studentId === student.id);
            const presentCount = studentAttendance.filter(a => a.status === 'present').length;
            const absentCount = studentAttendance.filter(a => a.status === 'absent').length;
            const excusedCount = studentAttendance.filter(a => a.status === 'excused').length;
            content += `<li class="mb-2 p-2 bg-gray-100 rounded"><strong>${student.name}:</strong> 
                        حضور: ${presentCount}, 
                        غياب: ${absentCount}, 
                        بعذر: ${excusedCount}</li>`;
        });
        content += '</ul>';
        onShowReport('تقرير الحضور', content);
    };
    
    const generateStudentsReport = () => {
        if (students.length === 0) {
            onShowReport('تقرير الطالبات', '<p>لا توجد بيانات لعرضها.</p>');
            return;
        }

        let content = '<ul>';
        students.forEach(student => {
            content += `<li class="mb-2 p-2 bg-gray-100 rounded">
                <strong>الاسم:</strong> ${student.name}<br/>
                <strong>العمر:</strong> ${student.age}<br/>
                <strong>تاريخ التسجيل:</strong> ${student.registrationDate}<br/>
                <strong>الإجازات:</strong> ${student.vacations || 'لا يوجد'}
            </li>`;
        });
        content += '</ul>';
        onShowReport('تقرير الطالبات', content);
    };


    return (
        <div className="flex flex-wrap justify-center gap-4">
            <button
                onClick={generateAttendanceReport}
                className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition"
            >
                تقارير الحضور
            </button>
            <button
                onClick={() => onShowReport('تقارير التقدم', '<p>ميزة قيد التطوير.</p>')}
                className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition"
            >
                تقارير التقدم
            </button>
            <button
                onClick={generateStudentsReport}
                className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-secondary transition"
            >
                تقارير الطالبات
            </button>
        </div>
    );
};

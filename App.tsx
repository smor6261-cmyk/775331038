
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Section } from './components/Section';
import { StudentManagement } from './components/StudentManagement';
import { SessionDetails } from './components/SessionDetails';
import { LessonDetails } from './components/LessonDetails';
import { StudentTrackerCard } from './components/StudentTrackerCard';
import { NotesSection } from './components/NotesSection';
import { Reports } from './components/Reports';
import { DataAnalysis } from './components/DataAnalysis';
import { ActionButtons } from './components/ActionButtons';
import { Footer } from './components/Footer';
import { StudentModal } from './components/StudentModal';
import { ReportModal } from './components/ReportModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Student, CouncilData, LessonData, StatusRecord } from './types';

const App: React.FC = () => {
    const [students, setStudents] = useLocalStorage<Student[]>('students', []);
    const [councilData, setCouncilData] = useLocalStorage<CouncilData>('councilData', {
        number: 1,
        date: new Date().toISOString().split('T')[0]
    });
    const [lessonData, setLessonData] = useLocalStorage<LessonData>('lessonData', { title: '', details: '' });
    const [attendanceData, setAttendanceData] = useLocalStorage<StatusRecord[]>('attendanceData', []);
    const [recitationData, setRecitationData] = useLocalStorage<StatusRecord[]>('recitationData', []);
    const [homeworkData, setHomeworkData] = useLocalStorage<StatusRecord[]>('homeworkData', []);
    const [researchData, setResearchData] = useLocalStorage<StatusRecord[]>('researchData', []);
    const [supervisorNotes, setSupervisorNotes] = useLocalStorage<string>('supervisorNotes', '');
    const [directorNotes, setDirectorNotes] = useLocalStorage<string>('directorNotes', '');


    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);

    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [reportContent, setReportContent] = useState({ title: '', content: '' });

    const handleAddStudent = () => {
        setEditingStudent(null);
        setIsStudentModalOpen(true);
    };

    const handleEditStudent = (student: Student) => {
        setEditingStudent(student);
        setIsStudentModalOpen(true);
    };

    const handleSaveStudent = (student: Student) => {
        if (editingStudent) {
            setStudents(students.map(s => s.id === student.id ? student : s));
        } else {
            setStudents([...students, { ...student, id: Date.now().toString() }]);
        }
        setIsStudentModalOpen(false);
        setEditingStudent(null);
    };

    const handleDeleteStudent = (studentId: string) => {
        if (window.confirm('هل أنت متأكد من حذف هذه الطالبة؟')) {
            setStudents(students.filter(s => s.id !== studentId));
        }
    };

    const handleShowReport = useCallback((title: string, content: string) => {
        setReportContent({ title, content });
        setIsReportModalOpen(true);
    }, []);
    
    const handleResetData = () => {
      if (window.confirm('هل أنت متأكد من مسح جميع البيانات؟ لا يمكن التراجع عن هذا الإجراء.')) {
        localStorage.clear();
        setStudents([]);
        setCouncilData({ number: 1, date: new Date().toISOString().split('T')[0] });
        setLessonData({ title: '', details: '' });
        setAttendanceData([]);
        setRecitationData([]);
        setHomeworkData([]);
        setResearchData([]);
        setSupervisorNotes('');
        setDirectorNotes('');
        alert('تم مسح جميع البيانات بنجاح');
      }
    };

    return (
        <div className="bg-gray-100 text-dark font-sans min-h-screen p-2 sm:p-4">
            <div className="container mx-auto max-w-7xl">
                <Header />
                <main className="space-y-4">
                    {/* Top-level sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Section title="إدارة الطالبات">
                            <StudentManagement
                                students={students}
                                onAddStudent={handleAddStudent}
                                onEditStudent={handleEditStudent}
                                onDeleteStudent={handleDeleteStudent}
                            />
                        </Section>
                        <Section title="بيانات المجلس والدرس">
                             <div className="space-y-4">
                                <SessionDetails data={councilData} setData={setCouncilData} />
                                <hr/>
                                <LessonDetails data={lessonData} setData={setLessonData} />
                            </div>
                        </Section>
                        <Section title="التقارير">
                            <Reports 
                                students={students} 
                                attendanceData={attendanceData}
                                recitationData={recitationData}
                                homeworkData={homeworkData}
                                researchData={researchData}
                                onShowReport={handleShowReport}
                            />
                        </Section>
                    </div>

                    {/* Student Tracking Section */}
                    <Section title="متابعة الطالبات اليومية" defaultOpen>
                       {students.length > 0 ? (
                            students.map(student => (
                                <StudentTrackerCard
                                    key={student.id}
                                    student={student}
                                    councilDate={councilData.date}
                                    attendanceData={attendanceData} setAttendanceData={setAttendanceData}
                                    recitationData={recitationData} setRecitationData={setRecitationData}
                                    homeworkData={homeworkData} setHomeworkData={setHomeworkData}
                                    researchData={researchData} setResearchData={setResearchData}
                                />
                            ))
                        ) : (
                            <p className="text-center text-gray-500 py-8">يرجى إضافة طالبات أولاً من قسم "إدارة الطالبات".</p>
                        )}
                    </Section>

                    {/* Notes Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <Section title="ملاحظات المشرفة">
                            <NotesSection 
                                title="ملاحظات المشرفة"
                                notes={supervisorNotes}
                                setNotes={setSupervisorNotes}
                                placeholder="أدخل ملاحظاتك هنا..."
                            />
                        </Section>
                         <Section title="ملاحظات المديرة">
                             <NotesSection 
                                title="ملاحظات المديرة"
                                notes={directorNotes}
                                setNotes={setDirectorNotes}
                                placeholder="أدخل ملاحظاتك هنا..."
                            />
                        </Section>
                    </div>
                    
                    {/* Data Analysis moved to the bottom */}
                    <div className="bg-white rounded-xl shadow-md p-4 mt-6">
                         <h2 className="text-xl font-bold text-primary mb-4 text-center">تحليل البيانات بالذكاء الاصطناعي</h2>
                         <DataAnalysis 
                           students={students}
                           councilData={councilData}
                           lessonData={lessonData}
                           attendanceData={attendanceData}
                           recitationData={recitationData}
                           homeworkData={homeworkData}
                           researchData={researchData}
                           supervisorNotes={supervisorNotes}
                           directorNotes={directorNotes}
                        />
                    </div>

                </main>
                <ActionButtons onReset={handleResetData} />
                <Footer />
            </div>

            <StudentModal
                isOpen={isStudentModalOpen}
                onClose={() => setIsStudentModalOpen(false)}
                onSave={handleSaveStudent}
                student={editingStudent}
            />

            <ReportModal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                title={reportContent.title}
                content={reportContent.content}
            />
        </div>
    );
};

export default App;

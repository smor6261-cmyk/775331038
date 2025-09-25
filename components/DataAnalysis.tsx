
import React, { useState, useCallback } from 'react';
import type { Student, CouncilData, LessonData, StatusRecord } from '../types';
import { analyzeStudentData } from '../services/geminiService';

interface DataAnalysisProps {
    students: Student[];
    councilData: CouncilData;
    lessonData: LessonData;
    attendanceData: StatusRecord[];
    recitationData: StatusRecord[];
    homeworkData: StatusRecord[];
    researchData: StatusRecord[];
    supervisorNotes: string;
    directorNotes: string;
}

export const DataAnalysis: React.FC<DataAnalysisProps> = ({ students, councilData, lessonData, attendanceData, recitationData, homeworkData, researchData, supervisorNotes, directorNotes }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState('');
    const [error, setError] = useState('');

    const handleAnalyze = useCallback(async () => {
        if (students.length === 0) {
            setAnalysisResult('لا توجد بيانات طالبات كافية للتحليل. يرجى إضافة طالبات أولاً.');
            return;
        }

        setIsLoading(true);
        setError('');
        setAnalysisResult('');

        try {
            const result = await analyzeStudentData({
                students,
                councilData,
                lessonData,
                attendanceData,
                recitationData,
                homeworkData,
                researchData,
                supervisorNotes,
                directorNotes
            });
            setAnalysisResult(result);
        } catch (err) {
            console.error('Gemini API error:', err);
            setError('حدث خطأ أثناء تحليل البيانات. يرجى المحاولة مرة أخرى.');
        } finally {
            setIsLoading(false);
        }
    }, [students, councilData, lessonData, attendanceData, recitationData, homeworkData, researchData, supervisorNotes, directorNotes]);

    return (
        <div>
            <button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="w-full bg-success text-white py-3 px-4 rounded-lg hover:bg-green-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        جاري التحليل...
                    </>
                ) : (
                    'تحليل بيانات الدورة الحالية'
                )}
            </button>
            {error && <p className="mt-4 text-center text-danger">{error}</p>}
            {analysisResult && (
                <div className="mt-4 p-4 bg-light rounded-lg border prose prose-sm max-w-none">
                    <h3 className="text-lg font-bold text-primary mb-2">نتائج التحليل:</h3>
                    <p className="whitespace-pre-wrap text-dark">{analysisResult}</p>
                </div>
            )}
        </div>
    );
};

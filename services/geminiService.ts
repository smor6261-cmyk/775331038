
import { GoogleGenAI } from "@google/genai";
import type { Student, CouncilData, LessonData, StatusRecord } from '../types';

interface AnalysisData {
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

const formatDataForPrompt = (data: AnalysisData): string => {
    let prompt = `
بيانات الدورة الحالية:
- رقم المجلس: ${data.councilData.number}
- تاريخ المجلس: ${data.councilData.date}
- عنوان الدرس: ${data.lessonData.title || 'غير محدد'}
- تفاصيل الدرس: ${data.lessonData.details || 'لا يوجد'}
- ملاحظات المشرفة: ${data.supervisorNotes || 'لا يوجد'}
- ملاحظات المديرة: ${data.directorNotes || 'لا يوجد'}

بيانات الطالبات (${data.students.length} طالبة):
`;
    data.students.forEach(student => {
        const attendance = data.attendanceData.find(d => d.studentId === student.id && d.date === data.councilData.date)?.status || 'لم تسجل';
        const recitation = data.recitationData.find(d => d.studentId === student.id && d.date === data.councilData.date)?.status || 'لم تسجل';
        const homework = data.homeworkData.find(d => d.studentId === student.id && d.date === data.councilData.date)?.status || 'لم تسجل';
        const research = data.researchData.find(d => d.studentId === student.id && d.date === data.councilData.date)?.status || 'لم يسجل';
        
        prompt += `
- الطالبة: ${student.name}
  - العمر: ${student.age}
  - تاريخ التسجيل: ${student.registrationDate}
  - الإجازات: ${student.vacations || 'لا يوجد'}
  - حالة الحضور اليوم: ${attendance}
  - حالة التسميع اليوم: ${recitation}
  - حالة الواجب اليوم: ${homework}
  - حالة البحث اليوم: ${research}
`;
    });
    return prompt;
};

export const analyzeStudentData = async (data: AnalysisData): Promise<string> => {
    if (!process.env.API_KEY) {
        return "خاصية التحليل بالذكاء الاصطناعي غير مفعلة. يرجى التأكد من إعداد مفتاح الواجهة البرمجية (API Key).";
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const formattedData = formatDataForPrompt(data);

        const prompt = `
أنت معلم خبير في القراءات القرآنية ولديك خبرة في تحليل أداء الطلاب. بناءً على البيانات التالية لدورة "الشاطبية والدرة"، قم بتقديم تحليل شامل وموجز.

${formattedData}

المطلوب:
1.  **ملخص عام:** قدم تقييمًا عامًا لأداء الطالبات في جلسة اليوم، مع الأخذ في الاعتبار ملاحظات المشرفة والمديرة إن وجدت.
2.  **طالبات متميزات:** اذكر أسماء الطالبات اللاتي أظهرن تميزًا في الحضور، التسميع، والواجبات.
3.  **طالبات بحاجة لمتابعة:** اذكر أسماء الطالبات اللاتي قد يحتجن إلى دعم إضافي أو متابعة، مع ذكر السبب (مثال: غياب متكرر، ضعف في التسميع).
4.  **توصيات:** قدم توصية أو توصيتين بناءً على البيانات والملاحظات لتحسين أداء الدورة أو لمساعدة طالبات معينين.

اكتب التحليل بلغة عربية واضحة ومباشرة ومحفزة.
`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error && error.message.includes('API key not valid')) {
             return "حدث خطأ: مفتاح الواجهة البرمجية (API Key) غير صالح. يرجى التحقق منه.";
        }
        throw new Error("Failed to get analysis from Gemini API.");
    }
};

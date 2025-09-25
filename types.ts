
export interface Student {
    id: string;
    name: string;
    age: number;
    registrationDate: string;
    vacations: string;
}

export interface CouncilData {
    number: number;
    date: string;
}

export interface LessonData {
    title: string;
    details: string;
}

export interface StatusRecord {
    studentId: string;
    date: string;
    status: string;
}

export interface StatusOption {
    value: string;
    label: string;
    className: string;
}

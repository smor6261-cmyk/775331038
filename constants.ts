
import type { StatusOption } from './types';

export const ATTENDANCE_OPTIONS: StatusOption[] = [
    { value: 'present', label: 'حاضرة', className: 'bg-success hover:bg-green-600' },
    { value: 'absent', label: 'غائبة', className: 'bg-danger hover:bg-red-600' },
    { value: 'excused', label: 'بعذر', className: 'bg-warning hover:bg-yellow-500 text-dark' },
];

export const RECITATION_OPTIONS: StatusOption[] = [
    { value: 'excellent', label: 'ممتاز', className: 'bg-success hover:bg-green-600' },
    { value: 'good', label: 'جيد', className: 'bg-info hover:bg-cyan-600' },
    { value: 'average', label: 'متوسط', className: 'bg-warning hover:bg-yellow-500 text-dark' },
    { value: 'poor', label: 'ضعيف', className: 'bg-danger hover:bg-red-600' },
];

export const HOMEWORK_OPTIONS: StatusOption[] = [
    { value: 'completed', label: 'منجز', className: 'bg-success hover:bg-green-600' },
    { value: 'pending', label: 'قيد الإنجاز', className: 'bg-warning hover:bg-yellow-500 text-dark' },
    { value: 'not-done', label: 'غير منجز', className: 'bg-danger hover:bg-red-600' },
];

export const RESEARCH_OPTIONS: StatusOption[] = [
    { value: 'completed', label: 'منجز', className: 'bg-success hover:bg-green-600' },
    { value: 'pending', label: 'قيد الإنجاز', className: 'bg-warning hover:bg-yellow-500 text-dark' },
    { value: 'not-done', label: 'غير منجز', className: 'bg-danger hover:bg-red-600' },
];

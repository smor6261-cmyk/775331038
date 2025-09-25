
import React from 'react';

interface ActionButtonsProps {
    onReset: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onReset }) => {
    return (
        <div className="flex flex-wrap justify-center gap-4 my-6">
            <button
                onClick={() => alert('يتم حفظ جميع البيانات تلقائيًا عند كل تغيير.')}
                className="bg-success text-white py-2 px-5 rounded-lg hover:bg-green-600 transition"
            >
                حفظ العمل
            </button>
             <button
                onClick={() => window.location.reload()}
                className="bg-warning text-dark py-2 px-5 rounded-lg hover:bg-yellow-500 transition"
            >
                تحميل البيانات
            </button>
            <button
                onClick={onReset}
                className="bg-danger text-white py-2 px-5 rounded-lg hover:bg-red-600 transition"
            >
                مسح جميع البيانات
            </button>
        </div>
    );
};

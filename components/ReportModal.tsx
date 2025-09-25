
import React from 'react';

interface ReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-full flex flex-col">
                 <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-bold text-primary">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                </div>
                <div className="p-6 overflow-y-auto" dangerouslySetInnerHTML={{ __html: content }}>
                </div>
                <div className="p-4 border-t flex justify-start">
                     <button onClick={onClose} className="bg-gray-200 text-dark py-2 px-6 rounded-lg hover:bg-gray-300 transition">إغلاق</button>
                </div>
            </div>
        </div>
    );
};

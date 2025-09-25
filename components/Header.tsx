
import React from 'react';

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413 0 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.5-5.613-1.458l-6.363 1.687zM5.424 18.159c.513.28 1.12.513 1.777.682.358.09.723.129 1.093.129 4.832 0 8.718-3.886 8.718-8.717 0-2.324-.91-4.512-2.542-6.145-1.633-1.632-3.82-2.542-6.145-2.542-4.83 0-8.717 3.886-8.717 8.717 0 1.95.633 3.81 1.777 5.352l-1.234 4.515 4.64-1.23z"/>
    </svg>
);

export const Header: React.FC = () => {
    return (
        <header className="bg-gradient-to-bl from-primary to-secondary text-white p-6 text-center rounded-xl mb-6 shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">سجل متابعة طالبات دورة الشاطبية والدرة</h1>
            <p className="text-lg mb-4">نظام إلكتروني لمتابعة تقدم الطالبات في الدورة</p>
            <div className="bg-white/20 p-4 rounded-lg text-sm max-w-md mx-auto">
                <p>إشراف أ/ سميرة ظافر الشعوبي معلمة القراءات القرآنية</p>
                <p>1447هـ - 2025م</p>
                 <a 
                    href="https://wa.me/967775331038" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center justify-center mt-3 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 shadow"
                >
                    <WhatsAppIcon />
                    <span>للتواصل عبر الواتساب</span>
                </a>
            </div>
        </header>
    );
};

import React from 'react';

const StatCard = ({ title, value, icon, trend, color = 'primary' }) => {
    const colorClasses = {
        primary: 'text-primary-500 bg-primary-500/10',
        blue: 'text-blue-400 bg-blue-400/10',
        red: 'text-red-500 bg-red-500/10',
        green: 'text-green-400 bg-green-400/10',
    };

    return (
        <div className="bg-[#1a1512] rounded-3xl p-6 border border-[#2d241e] hover:border-primary-500/30 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl transition-transform group-hover:scale-110 duration-300 ${colorClasses[color] || colorClasses.primary}`}>
                    {icon}
                </div>
                {trend && (
                    <span className={`text-xs font-bold flex items-center gap-1 ${trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                        <svg className={`w-3 h-3 ${trend.startsWith('-') ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        {trend}
                    </span>
                )}
            </div>
            <p className="text-neutral-500 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-2xl font-black text-white tracking-tight">{value}</h3>
        </div>
    );
};

export default StatCard;

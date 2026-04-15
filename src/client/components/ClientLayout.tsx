import React from 'react';
import { Outlet } from 'react-router-dom';
import ClientSidebar from './ClientSidebar';
import ClientHeader from './ClientHeader';

const ClientLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-black font-inter flex overflow-hidden relative">
            <div className="hidden lg:block">
                <ClientSidebar />
            </div>

            <div className="relative z-10 flex-1 flex flex-col lg:pl-56 h-screen">
                <ClientHeader />

                <main className="flex-1 overflow-y-auto w-full">
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ClientLayout;

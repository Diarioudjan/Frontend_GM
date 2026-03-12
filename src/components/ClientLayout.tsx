import React, { ReactNode } from 'react';
import ClientSidebar from './ClientSidebar';
import ClientHeader from './ClientHeader';

interface ClientLayoutProps {
    children: ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-black font-inter flex overflow-hidden">
            {/* Sidebar fixed for desktop */}
            <div className="hidden lg:block">
                <ClientSidebar />
            </div>

            {/* Main content area */}
            <div className="flex-1 flex flex-col lg:pl-56 h-screen">
                <ClientHeader />

                <main className="flex-1 overflow-y-auto w-full">
                    <div className="max-w-[1600px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ClientLayout;

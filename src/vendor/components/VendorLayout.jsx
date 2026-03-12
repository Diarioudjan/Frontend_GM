import React from 'react';
import { Outlet } from 'react-router-dom';
import VendorSidebar from './VendorSidebar';
import VendorHeader from './VendorHeader';

const VendorLayout = () => {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-black flex transition-colors duration-300">
            <VendorSidebar />

            <div className="flex-grow ml-56 flex flex-col min-h-screen">
                <VendorHeader />

                <main className="p-6 flex-grow">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default VendorLayout;

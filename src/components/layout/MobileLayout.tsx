import React from 'react';

interface MobileLayoutProps {
  children: React.ReactNode;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-linear-to-br from-primary-start to-primary-end flex justify-center items-start p-0 md:p-5">
      <div className="w-full max-w-[480px] min-h-screen bg-[#f5f5f5] relative shadow-[0_0_50px_rgba(0,0,0,0.3)] flex flex-col md:rounded-3xl md:overflow-hidden">
        {children}
      </div>
    </div>
  );
};

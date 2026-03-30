import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
      <div className="flex flex-col items-center justify-center">
        {/* Spinner */}
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-[#42454a] rounded-full animate-spin"></div>
        </div>
        
        {/* Loading Text */}
        <p className="text-[#42454a] font-medium text-lg tracking-wider">
          Loading<span className="inline-block animate-pulse">...</span>
        </p>
      </div>
    </div>
  );
};

export default Loader;

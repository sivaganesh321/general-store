import React from 'react';

export function Preloader() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
        <div className="mt-4 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Ganesh General Store</h2>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    </div>
  );
}
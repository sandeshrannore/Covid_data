// src/components/AppBar.tsx
import React from 'react';

interface AppBarProps {
    title: string;
  onMenuClick: () => void;
}

const AppBar: React.FC<AppBarProps> = ({title, onMenuClick }) => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="text-2xl mr-4">
          ☰
        </button>
        <h1 className="text-xl">{title}</h1>
      </div>
    </header>
  );
};

export default AppBar;

// src/components/Sidebar.tsx
import React from "react";

interface SidebarProps {
  open: boolean;
  onItemClick: (section: Section) => void;
}

enum Section {
  Contacts = "contacts",
  Charts = "charts",
}

const Sidebar: React.FC<SidebarProps> = ({ open, onItemClick }) => {
  return (
    <nav
        className={`bg-gray-700 text-white ${
          open ? "w-32 " : "w-0"
        } transition-width ease-in-out duration-300`}
      >
      <ul className="pt-8 px-4 h-full overflow-y-auto flex flex-col align-middle">
        <li className="mb-4 flex flex-col align-middle">
          <button
            onClick={() => onItemClick(Section.Contacts)}
            className="block text-center"
          >
            Contacts
          </button>
          <div className="w-full bg-gray-800 h-px mt-4 mb-1"></div>{" "}
          {/* Divider */}
        </li>

        <li className="mb-4 flex flex-col align-middle">
          <button
            onClick={() => onItemClick(Section.Charts)}
            className="block text-center"
          >
            Charts and Maps
          </button>
        </li>
        {/* Add more sections if needed */}
      </ul>
    </nav>
  );
};

export default Sidebar;

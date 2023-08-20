// src/components/App.tsx
import React, { useState } from 'react';
import Appbar from './components/Appbar';
import Sidebar from './components/Sidebar';
import ContactPage from './pages/ContactPage';
import MapPage from './pages/MapPage';

enum Section {
  Contacts = 'contacts',
  Charts = 'charts', 
}

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(Section.Contacts);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarItemClick = (section: Section) => {
    setCurrentSection(section);
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  let content;
  if (currentSection === Section.Contacts) {
    content = <ContactPage/>;
  } else if (currentSection === Section.Charts) {
    content = <MapPage/>;
  }

  let pageTitle = '';
  if (currentSection === Section.Contacts) {
    pageTitle = 'Contacts';
  } else if (currentSection === Section.Charts) {
    pageTitle = 'Charts and Maps';
  }


  return (
    <div className="flex flex-col h-screen w-full overflow-x-hidden">
      <Appbar  title={pageTitle} onMenuClick={handleMenuClick}/>
      <div className="flex-grow flex relative">
        <Sidebar open={sidebarOpen} onItemClick={handleSidebarItemClick} />
        <main className={`w-full transition-transform duration-300`}>
          {content}
        </main>
      </div>
    </div>
  );
};

export default App;

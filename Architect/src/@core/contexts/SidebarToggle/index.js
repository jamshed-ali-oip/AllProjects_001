import {useContext, useState} from 'react';
import {createContext} from 'react';

export const SidebarContext = createContext({});

export const SidebarProvider = ({children}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const values = {
    toggleSidebar,
    isSidebarOpen,
    setIsSidebarOpen,
  };

  return (
    <SidebarContext.Provider value={values}>{children}</SidebarContext.Provider>
  );
};

export const useSidebarToggle = () => useContext(SidebarContext);

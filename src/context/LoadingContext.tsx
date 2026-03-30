import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
  isHeaderLoaded: boolean;
  isHeroLoaded: boolean;
  setHeaderLoaded: (loaded: boolean) => void;
  setHeroLoaded: (loaded: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isHeaderLoaded, setHeaderLoaded] = useState(false);
  const [isHeroLoaded, setHeroLoaded] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        isHeaderLoaded,
        isHeroLoaded,
        setHeaderLoaded,
        setHeroLoaded,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

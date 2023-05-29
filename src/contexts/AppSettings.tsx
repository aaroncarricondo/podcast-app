import { ReactNode, createContext, useContext, useState } from 'react';

interface AppSettingsData {
  isLoading: boolean;
  addOperation: (operationName: string) => void;
  removeOperation: (operationName: string) => void;
}

const AppSettingsContext = createContext<AppSettingsData>(undefined);

interface AppSettingsProviderProps {
  children: ReactNode;
}

export const AppSettingsProvider = ({ children }: AppSettingsProviderProps) => {
  const [loadingOperations, setLoadingOperations] = useState<string[]>([]);

  const addOperation = (operationName: string) => {
    setLoadingOperations((prev) => [...prev, operationName]);
  };

  const removeOperation = (operationName: string) => {
    setLoadingOperations((prev) => prev.filter((op) => op !== operationName));
  };

  const value = {
    isLoading: loadingOperations.length !== 0,
    addOperation,
    removeOperation,
  };

  return <AppSettingsContext.Provider value={value}>{children}</AppSettingsContext.Provider>;
};

export const useAppSettings = (): AppSettingsData => {
  const context = useContext(AppSettingsContext);
  if (context === undefined) {
    throw new Error(
      'useAppSettings must be used within the corresponding AppSettingsProvider',
    );
  }
  return context;
};

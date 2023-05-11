import { createContext, useContext, useMemo, useState } from 'react';

interface AppSettingsData {
  isLoading: boolean;
  addOperation: (operationName: string) => void;
  removeOperation: (operationName: string) => void;
}

const appSettingsDefaultValue: AppSettingsData = {
  isLoading: false,
  addOperation: () => undefined,
  removeOperation: () => undefined,
};

const AppSettingsContext = createContext<AppSettingsData>(
  appSettingsDefaultValue,
);

interface AppSettingsProviderProps {
  children: any;
}

export const AppSettingsProvider = ({ children }: AppSettingsProviderProps) => {
  const [loadingOperations, setLoadingOperations] = useState<string[]>([]);

  const addOperation = (operationName: string) => {
    setLoadingOperations((prev) => [...prev, operationName]);
  };

  const removeOperation = (operationName: string) => {
    setLoadingOperations((prev) => prev.filter((op) => op !== operationName));
  };

  const value = useMemo(() => {
    return {
      isLoading: loadingOperations.length !== 0,
      addOperation,
      removeOperation,
    }
  }, [loadingOperations]);

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

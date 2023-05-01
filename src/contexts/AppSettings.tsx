import { createContext, useContext, useMemo, useReducer, useState } from 'react';

export interface AppSettingsData {
  isLoading: boolean;
  addOperation: (operationName: string) => void;
  removeOperation: (operationName: string) => void;
}

export const appSettingsDefaultValue: AppSettingsData = {
  isLoading: false,
  addOperation: () => undefined,
  removeOperation: () => undefined,
};

export const AppSettingsContext = createContext<AppSettingsData>(
  appSettingsDefaultValue,
);

interface AppSettingsProviderProps {
  children: any;
}

export const AppSettingsProvider = ({ children }: AppSettingsProviderProps) => {
  const [fetchOperations, setFetchOperations] = useState<string[]>([]);

  const addOperation = (operationName: string) => {
    setFetchOperations((prev) => [...prev, operationName]);
  };

  const removeOperation = (operationName: string) => {
    setFetchOperations((prev) => prev.filter((op) => op !== operationName));
  };

  const value = useMemo(() => {
    return {
      isLoading: fetchOperations.length !== 0,
      addOperation,
      removeOperation,
    }
  }, [fetchOperations]);

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

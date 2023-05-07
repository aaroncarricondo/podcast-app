import IStoredData from "../models/IStoredData";

const checkDataOutdated = (storedData: IStoredData) => {
  if (!storedData) return true;
  const todayDate = new Date();

  const storedDate = new Date(storedData.date);

  const isSameDay = storedDate.getDay() === todayDate.getDay();
  if (!isSameDay) {
    const isHourBefore = todayDate.getHours() < storedDate.getHours();
    return !isHourBefore;
  }

  return false;
};

export const getStoredData = <T = any>(localStorageKey: string) => {
  const storedData = localStorage.getItem(localStorageKey);
  const parsedStoredData: IStoredData<T> = storedData ? JSON.parse(storedData) : undefined;

  return { isDataOutdated: checkDataOutdated(parsedStoredData), storedData: parsedStoredData };
};

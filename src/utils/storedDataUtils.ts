import IStoredData from "../models/IStoredData";

export const checkDataOutdated = (storedData: IStoredData) => {
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

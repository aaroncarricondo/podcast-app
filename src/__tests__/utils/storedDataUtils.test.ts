import IStoredData from '../../models/IStoredData';
import { setStoredData, getStoredData } from '../../utils/storedDataUtils';

const outdatedDataKey = 'outdatedDataKey';
const notOutdatedDataKey = 'notOutdatedDataKey';
const unExistingDataKey = 'unExistingDataKey';

describe('Get local storage stored data', () => {
  beforeAll(() => {
    // Outdated data -- Mock data and date
    const outdatedDate = new Date();
    outdatedDate.setDate(outdatedDate.getDate() - 1);
    const outdatedData: IStoredData<string> = {
      data: 'Mocked outdated data',
      date: outdatedDate,
    };
    localStorage.setItem(outdatedDataKey, JSON.stringify(outdatedData));

    // Not outdated data
    setStoredData(notOutdatedDataKey, 'Mocked NOT outdated data');

    // Remove item to be sure that there is no data related to that key
    localStorage.removeItem(unExistingDataKey);
  });

  it('data exists and is outdated', () => {
    const { isDataOutdated, storedData } = getStoredData(outdatedDataKey);

    expect(isDataOutdated).toBeTruthy();
    expect(storedData).toBeTruthy();
  });

  it('data exists and is not outdated', () => {
    const { isDataOutdated, storedData } = getStoredData(notOutdatedDataKey);

    expect(isDataOutdated).toBeFalsy();
    expect(storedData).toBeTruthy();
  });

  it('data does not exists', () => {
    const { isDataOutdated, storedData } = getStoredData(unExistingDataKey);

    expect(isDataOutdated).toBeTruthy();
    expect(storedData).toBeFalsy();
  });
});
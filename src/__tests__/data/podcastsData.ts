import IPodcast from "../../models/IPodcast";
import IRawPodcast from "../../models/IRawPodcast";

const mockedRawPodcast: IRawPodcast = {
  id: {
    label: '1',
  },
  summary: {
    label: 'Mocked summary',
  },
  "im:image": [
    {
      label: '',
    },
  ],
  "im:name": {
    label: 'Mocked podcast',
  },
  "im:artist": {
    label: 'Mocked author',
  },
};

export const getMockedRawPodcasts = (num: number = 10): IRawPodcast[] => {
  return Array.from(Array(num).keys()).map((index) => {
    return {
      ...mockedRawPodcast,
      id: {
        label: `${index}`,
      },
    };
  });
};

export const mockedPodcast: IPodcast = {
  id: '1',
  title: 'Mocked podcast',
  author: 'Mocked author',
  summary: 'Mocked summary',
  image: ''
};

const filterablePodcast: IPodcast = {
  id: 'filterable',
  title: 'Filterable title',
  author: 'John Smith',
  summary: 'Mocked summary',
  image: '',
}

export const getMockedPodcasts = (num: number = 10, withFilterablePodcast = false): IPodcast[] => {
  const podcasts = Array.from(Array(num).keys()).map((index) => {
    return {
      ...mockedPodcast,
      id: `${index}`,
    };
  });

  if (!withFilterablePodcast) return podcasts;

  return [...podcasts, filterablePodcast]; 
};
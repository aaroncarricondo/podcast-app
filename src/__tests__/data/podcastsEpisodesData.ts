import IPodcastTrack from "../../models/IPodcastTrack";

export const mockedEpisode: IPodcastTrack = {
  trackId: 1,
  trackName: 'Mocked track',
  description: 'Mocked track description',
  releaseDate: '',
  trackTimeMillis: 309000,
  episodeUrl: 'https://file-examples.com/storage/fe563fce08645a90397f28d/2017/11/file_example_MP3_700KB.mp3',
};

export const getMockedEpisodes = (num: number = 10): IPodcastTrack[] => {
  return Array.from(Array(num).keys()).map((trackId) => {
    return {
      ...mockedEpisode,
      trackId,
    };
  });
};
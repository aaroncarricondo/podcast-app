import IPodcastTrack from "./IPodcastTrack";

interface IRawPodcastData {
  resultCount: number;
  results: IPodcastTrack[];
}

export default IRawPodcastData;

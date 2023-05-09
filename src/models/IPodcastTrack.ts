interface IPodcastTrack {
  trackId: number;
  trackName: string;
  description: string;
  releaseDate: string;
  trackTimeMillis: number;
  trackCount?: number;

  // Audio
  episodeUrl: string;
}

export default IPodcastTrack;

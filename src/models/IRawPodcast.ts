interface IRawPodcastProperty {
  label: string;
  attributes?: Record<string, string>;
}

interface IRawPodcast {
  id: IRawPodcastProperty;
  summary: IRawPodcastProperty;
  'im:image': IRawPodcastProperty[];
  'im:name': IRawPodcastProperty;
  'im:artist': IRawPodcastProperty;
}

export default IRawPodcast;

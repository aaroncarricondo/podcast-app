interface IPodcastProperty {
  label: string;
  attributes?: Record<string, string>;
}

interface IRawPodcast {
  id: IPodcastProperty;
  summary: IPodcastProperty;
  'im:image': IPodcastProperty[];
  'im:name': IPodcastProperty;
  'im:artist': IPodcastProperty;
}

export default IRawPodcast;

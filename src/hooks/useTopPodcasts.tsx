import { useEffect, useState } from "react";
import IPodcast from "../models/IPodcast";
import IRawPodcast from "../models/IRawPodcast";
import { useAppSettings } from "../contexts/AppSettings";
import IStoredData from "../models/IStoredData";
import { getStoredData } from "../utils/storedDataUtils";

const topPodcastsKey = 'topPodcasts';

const useTopPodcasts = () => {
  const { addOperation, removeOperation } = useAppSettings();

  const [topPodcasts, setTopPodcasts] = useState<IPodcast[]>();

  useEffect(() => {
    const { isDataOutdated, storedData } = getStoredData<IPodcast[]>(topPodcastsKey);
    if (isDataOutdated) fetchPodcasts();
    else setTopPodcasts(storedData.data);

    return () => {
      removeOperation(topPodcastsKey);
    }
  }, []);

  const fetchPodcasts = async () => {
    addOperation(topPodcastsKey);
    try {
      const response = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
      const { feed: { entry } }: { feed: { entry: IRawPodcast[] } } = await response.json();

      const parsedPodcasts: IPodcast[] = entry.map((e) => {
        return {
          id: e.id?.attributes?.['im:id'],
          title: e['im:name']?.label,
          author: e['im:artist']?.label,
          summary: e.summary?.label,
          image: e["im:image"]?.at(-1).label,
        };
      });

      setTopPodcasts(parsedPodcasts);
      const dataToStore: IStoredData<IPodcast[]> = {
        data: parsedPodcasts,
        date: new Date(),
      };
      localStorage.setItem(topPodcastsKey, JSON.stringify(dataToStore));
    } catch (error) {
      console.error(error);
    } finally {
      removeOperation(topPodcastsKey);
    }
  };

  const getPodcastById = (id: string) => topPodcasts?.find((podcast) => podcast.id === id);

  return { topPodcasts, getPodcastById };
};

export default useTopPodcasts;

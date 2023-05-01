import { useEffect, useState } from "react";
import { useAppSettings } from "../contexts/AppSettings";
import IStoredData from "../models/IStoredData";
import IRawPodcastData from "../models/IRawPodcastData";
import { checkDataOutdated } from "../utils/storedDataUtils";

const usePodcastEpisodes = (id: string) => {
  const { addOperation, removeOperation } = useAppSettings();

  const [podcastData, setPodcastData] = useState<IRawPodcastData>();
  const { trackCount } = podcastData?.results.at(0) || {};
  const episodes = podcastData?.results.slice(1);

  const podcastDetailsKey = `podcastDetails-${id}`;

  const getStoredData = () => {
    const storedData = localStorage.getItem(podcastDetailsKey);
    const parsedStoredData: IStoredData<IRawPodcastData> = storedData ? JSON.parse(storedData) : undefined;

    return parsedStoredData;
  };

  useEffect(() => {
    return () => {
      removeOperation(podcastDetailsKey);
    };
  }, []);

  useEffect(() => {
    if (id) {
      const storedData = getStoredData();
      const isDataOutdated = checkDataOutdated(storedData);
      if (isDataOutdated) fetchPodcasts();
      else {
        setPodcastData(storedData.data);
      }
    }
  }, [id]);

  const fetchPodcasts = async () => {
    addOperation(podcastDetailsKey);
    try {
      const url = `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`;
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      const parsedData = JSON.parse(data.contents);
      setPodcastData(parsedData);
      const dataToStore: IStoredData<IRawPodcastData> = {
        data: parsedData,
        date: new Date(),
      };
      localStorage.setItem(podcastDetailsKey, JSON.stringify(dataToStore));
    } catch (error) {
      console.error(error);
    } finally {
      removeOperation(podcastDetailsKey);
    }
  };

  const getEpisodeById = (id: string) => episodes?.find((episode) => episode.trackId === +id);

  return { trackCount, episodes, getEpisodeById };
};

export default usePodcastEpisodes;

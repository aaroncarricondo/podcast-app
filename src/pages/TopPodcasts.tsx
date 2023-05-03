import { useEffect, useState } from "react";
import IPodcast from "../models/IPodcast";
import useTopPodcasts from "../hooks/useTopPodcasts";
import { useAppSettings } from "../contexts/AppSettings";
import PodcastFilterer from "../components/PodcastFilterer";
import PodcastGrid from "../components/PodcastGrid";

const TopPodcasts = () => {
  const { topPodcasts } = useTopPodcasts();
  const [filteredPodcasts, setFilteredPodcasts] = useState<IPodcast[]>();

  useEffect(() => {
    setFilteredPodcasts(topPodcasts);
  }, [topPodcasts]);

  const filterPodcast = (podcast: IPodcast, value: string) => {
    const { title, author } = podcast || {};
    return title.toLowerCase().includes(value) || author.toLowerCase().includes(value);
  }

  const onSearchChange = (keyword: string) => {
    if (keyword) {
      setFilteredPodcasts(topPodcasts.filter((p) => filterPodcast(p, keyword.toLowerCase())));
    }
    else setFilteredPodcasts(topPodcasts);
  };

  return (
    <>
      <PodcastFilterer badgeCount={filteredPodcasts?.length} onSearchChange={onSearchChange} />
      <PodcastGrid podcasts={filteredPodcasts}/>
    </>
  );
};

export default TopPodcasts;

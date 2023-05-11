import { useEffect, useState } from "react";
import IPodcast from "../../models/IPodcast";
import useTopPodcasts from "../../hooks/useTopPodcasts";
import TopPodcastsView from "./TopPodcastsView";

const TopPodcastsContainer = () => {
  const { topPodcasts } = useTopPodcasts();
  const [filteredPodcasts, setFilteredPodcasts] = useState<IPodcast[]>();

  useEffect(() => {
    setFilteredPodcasts(topPodcasts);
  }, [topPodcasts]);

  const filterPodcast = (podcast: IPodcast, value: string) => {
    const { title, author } = podcast;
    return title.toLowerCase().includes(value) || author.toLowerCase().includes(value);
  }

  const onSearchChange = (keyword: string) => {
    if (keyword) {
      setFilteredPodcasts(topPodcasts.filter((p) => filterPodcast(p, keyword.toLowerCase())));
    }
    else setFilteredPodcasts(topPodcasts);
  };

  return <TopPodcastsView podcasts={filteredPodcasts} onSearchChange={onSearchChange} />;
};

export default TopPodcastsContainer;

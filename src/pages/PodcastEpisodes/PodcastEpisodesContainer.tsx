import { useParams } from "react-router-dom";
import usePodcastEpisodes from "../../hooks/usePodcastEpisodes";
import PodcastEpisodesView from "./PodcastEpisodesView";

const PodcastEpisodesContainer = () => {
  const { podcastId } = useParams();
  const { episodes, trackCount } = usePodcastEpisodes(podcastId);

  return <PodcastEpisodesView episodes={episodes} trackCount={trackCount} />;
};

export default PodcastEpisodesContainer;

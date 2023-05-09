import { useParams } from "react-router-dom";
import usePodcastEpisodes from "../../hooks/usePodcastEpisodes";
import EpisodeDetailsView from "./EpisodeDetailsView";

const EpisodeDetailsContainer = () => {
  const { podcastId, episodeId } = useParams();

  const { getEpisodeById } = usePodcastEpisodes(podcastId);
  const episode = getEpisodeById(episodeId);

  return <EpisodeDetailsView episode={episode} />;
};

export default EpisodeDetailsContainer;

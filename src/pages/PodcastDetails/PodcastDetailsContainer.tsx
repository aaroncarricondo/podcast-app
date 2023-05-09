import { useParams } from "react-router-dom";
import useTopPodcasts from "../../hooks/useTopPodcasts";
import PodcastDetailsView from "./PodcastDetailsView";

const PodcastDetailsContainer = () => {
  const { podcastId } = useParams();

  const { getPodcastById } = useTopPodcasts();
  const podcast = getPodcastById(podcastId);

  return <PodcastDetailsView podcast={podcast} />;
};

export default PodcastDetailsContainer;

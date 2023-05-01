import { Card, Typography } from "antd";
import { useAppSettings } from "../contexts/AppSettings";
import { useParams } from "react-router-dom";
import usePodcastEpisodes from "../hooks/usePodcastEpisodes";

const { Title } = Typography;

const EpisodeDetails = () => {
  const { podcastId, episodeId } = useParams();
  const { isLoading } = useAppSettings();

  const { getEpisodeById } = usePodcastEpisodes(podcastId);
  const episode = getEpisodeById(episodeId);

  return (
    <Card loading={isLoading}>
      <Title level={2} style={{ marginTop: 0 }}>{episode?.trackName}</Title>
      <div dangerouslySetInnerHTML={{ __html: episode?.description }} style={{ fontStyle: 'italic', marginBottom: 48 }} />
      <audio controls src={episode?.episodeUrl} style={{ width: '100%' }} />
    </Card>
  );
};

export default EpisodeDetails;

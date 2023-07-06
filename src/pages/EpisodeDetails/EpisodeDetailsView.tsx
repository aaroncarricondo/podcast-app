import { useState } from "react";
import { Card, Skeleton, Typography } from "antd";
import { useAppSettings } from "../../contexts/AppSettings";
import IPodcastTrack from "../../models/IPodcastTrack";
import '../../styles/episodeDetails.css';

const { Title } = Typography;

interface IEpisodeDetailsViewProps {
  episode: IPodcastTrack;
};

const EpisodeDetailsView: React.FC<IEpisodeDetailsViewProps> = ({ episode }: IEpisodeDetailsViewProps) => {
  const { isLoading } = useAppSettings();
  const [loading, setLoading] = useState(true);
  const { trackName, description, episodeUrl } = episode || {};

  return (
    <Card loading={isLoading}>
      <Title level={2} className="episode-details-title">{trackName}</Title>
      <div className="episode-details-html-content" dangerouslySetInnerHTML={{ __html: description }} />
      {loading && <Skeleton.Button className="episode-details-audio" active={true} size="large" shape="round" />}
      <audio className="episode-details-audio" controls src={episodeUrl} onCanPlay={() => setLoading(false)} hidden={loading} />
    </Card>
  );
};

export default EpisodeDetailsView;

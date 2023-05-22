import { Card, Typography } from "antd";
import { useAppSettings } from "../../contexts/AppSettings";
import IPodcastTrack from "../../models/IPodcastTrack";
import '../../styles/episodeDetails.css';

const { Title } = Typography;

interface IEpisodeDetailsViewProps {
  episode: IPodcastTrack;
};

const EpisodeDetailsView: React.FC<IEpisodeDetailsViewProps> = ({ episode }: IEpisodeDetailsViewProps) => {
  const { isLoading } = useAppSettings();
  const { trackName, description, episodeUrl } = episode || {};

  return (
    <Card loading={isLoading}>
      <Title level={2} className="episode-details-title">{trackName}</Title>
      <div className="episode-details-html-content" dangerouslySetInnerHTML={{ __html: description }} />
      <audio className="episode-details-audio" controls src={episodeUrl} />
    </Card>
  );
};

export default EpisodeDetailsView;

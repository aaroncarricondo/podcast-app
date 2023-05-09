import { Card, Typography } from "antd";
import { useAppSettings } from "../../contexts/AppSettings";
import IPodcastTrack from "../../models/IPodcastTrack";

const { Title } = Typography;

interface IEpisodeDetailsViewProps {
  episode: IPodcastTrack;
};

const EpisodeDetailsView: React.FC<IEpisodeDetailsViewProps> = ({ episode }: IEpisodeDetailsViewProps) => {
  const { isLoading } = useAppSettings();
  const { trackName, description, episodeUrl } = episode || {};

  return (
    <Card loading={isLoading}>
      <Title level={2} style={{ marginTop: 0 }}>{trackName}</Title>
      <div dangerouslySetInnerHTML={{ __html: description }} style={{ fontStyle: 'italic', marginBottom: 48 }} />
      <audio controls src={episodeUrl} style={{ width: '100%' }} />
    </Card>
  );
};

export default EpisodeDetailsView;

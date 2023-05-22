import { useNavigate } from "react-router-dom";
import IPodcastTrack from "../../models/IPodcastTrack";
import { ColumnsType } from "antd/lib/table";
import { Button, Card, Table, Typography } from "antd";
import { millisToMinutesAndSeconds } from "../../utils/timeUtils";
import { useAppSettings } from "../../contexts/AppSettings";
import '../../styles/podcastEpisodes.css';

const { Title } = Typography;

interface IPodcastEpisodesViewProps {
  trackCount: number;
  episodes: IPodcastTrack[];
}

const PodcastEpisodesView: React.FC<IPodcastEpisodesViewProps> = ({ trackCount, episodes }: IPodcastEpisodesViewProps) => {
  const { isLoading } = useAppSettings();
  const navigate = useNavigate();

  const columns: ColumnsType<IPodcastTrack> = [
    {
      title: 'Title',
      render: (_, record) => <Button type="link" onClick={() => navigate(`${record.trackId}`)}>{record.trackName}</Button>,
    },
    {
      title: 'Date',
      render: (_, record) => new Date(record.releaseDate).toLocaleDateString(),
    },
    {
      title: 'Duration',
      render: (_, record) => millisToMinutesAndSeconds(record.trackTimeMillis),
    },
  ];

  return (
    <>
      <Card className="podcast-episodes-card" loading={isLoading}>
        <Title level={2} className="podcast-episodes-counter">Episodes: {trackCount}</Title>
      </Card>
      <Card className="podcast-episodes-card" loading={isLoading}>
        <Table
          rowKey="trackId"
          columns={columns}
          dataSource={episodes}
          pagination={false}
          size="small"
        />
      </Card>
    </>
  );
};

export default PodcastEpisodesView;

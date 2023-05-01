import { Button, Card, Table, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useNavigate, useParams } from "react-router-dom";
import usePodcastEpisodes from "../hooks/usePodcastEpisodes";
import { useAppSettings } from "../contexts/AppSettings";
import IPodcastTrack from "../models/IPodcastTrack";
import { millisToMinutesAndSeconds } from "../utils/timeUtils";

const { Title } = Typography;

const PodcastEpisodes = () => {
  const { isLoading } = useAppSettings();

  const { podcastId } = useParams();
  const navigate = useNavigate();
  const { episodes, trackCount } = usePodcastEpisodes(podcastId);

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
      <Card style={{ marginBottom: 32 }} loading={isLoading}>
        <Title level={2} style={{ margin: 0 }}>Episodes: {trackCount}</Title>
      </Card>
      <Card loading={isLoading}>
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

export default PodcastEpisodes;

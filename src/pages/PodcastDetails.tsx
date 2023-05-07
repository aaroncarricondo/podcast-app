import { Card, Col, Divider, Row, Space, Typography } from "antd";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAppSettings } from "../contexts/AppSettings";
import useTopPodcasts from "../hooks/useTopPodcasts";

const { Text } = Typography;

const PodcastDetails = () => {
  const { podcastId } = useParams();
  const { isLoading } = useAppSettings();

  const { getPodcastById } = useTopPodcasts();
  const podcast = getPodcastById(podcastId);
  const { image, title, author, summary } = podcast || {};

  const navigate = useNavigate();

  const navigateToPodcast = () => navigate(`/podcast/${podcastId}`);

  return (
    <Row gutter={32}>
      <Col span={8}>
        <Card style={{ marginRight: 48 }} loading={isLoading}>
          <div style={{ padding: '0 24px' }}>
            <img className="clickable" width="100%" src={image} onClick={navigateToPodcast} />
          </div>
          <Divider />
          <Space direction="vertical" size={0}>
            <Text className="clickable" strong onClick={navigateToPodcast}>{title}</Text>
            <Text className="clickable" italic onClick={navigateToPodcast}>by {author}</Text>
          </Space>
          <Divider />
          <Text strong>Description:</Text>
          <br />
          <Text italic>{summary}</Text>
        </Card>
      </Col>
      <Col span={16}>
        <Outlet />
      </Col>
    </Row>
  );
};

export default PodcastDetails;

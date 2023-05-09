import { Outlet, useNavigate } from "react-router-dom";
import { useAppSettings } from "../../contexts/AppSettings";
import IPodcast from "../../models/IPodcast";
import { Row, Col, Card, Divider, Space, Typography } from "antd";

const { Text } = Typography;

interface IPodcastDetailsViewProps {
  podcast: IPodcast;
}

const PodcastDetailsView: React.FC<IPodcastDetailsViewProps> = ({ podcast }: IPodcastDetailsViewProps) => {
  const { isLoading } = useAppSettings();
  const navigate = useNavigate();

  const { id, image, title, author, summary } = podcast || {};

  const navigateToPodcast = () => navigate(`/podcast/${id}`);

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

export default PodcastDetailsView;

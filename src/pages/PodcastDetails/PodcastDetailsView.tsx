import { Outlet, useNavigate } from "react-router-dom";
import { useAppSettings } from "../../contexts/AppSettings";
import IPodcast from "../../models/IPodcast";
import { Row, Col, Card, Divider, Space, Typography } from "antd";
import '../../styles/podcastDetails.css';

const { Text } = Typography;

interface IPodcastDetailsViewProps {
  podcast: IPodcast;
}

const detailsColumnBreakpoints = { xs: 24, sm: 24, md: 8 };
const episodesColumnBreakpoints = { xs: 24, sm: 24, md: 16 };

const PodcastDetailsView: React.FC<IPodcastDetailsViewProps> = ({ podcast }: IPodcastDetailsViewProps) => {
  const { isLoading } = useAppSettings();
  const navigate = useNavigate();

  const { id, image, title, author, summary } = podcast || {};

  const navigateToPodcast = () => navigate(`/podcast/${id}`);

  return (
    <Row gutter={[32, 32]}>
      <Col {...detailsColumnBreakpoints}>
        <Card className="podcast-details-card" loading={isLoading}>
          <div className="podcast-details-img-container">
            <img className="clickable" width="100%" src={image} onClick={navigateToPodcast} />
          </div>
          <Divider />
          <Space direction="vertical" size={0}>
            <Text className="clickable" strong onClick={navigateToPodcast}>{title}</Text>
            <Text italic>by {author}</Text>
          </Space>
          <Divider />
          <Text strong>Description:</Text>
          <br />
          <Text italic>{summary}</Text>
        </Card>
      </Col>
      <Col {...episodesColumnBreakpoints}>
        <Outlet />
      </Col>
    </Row>
  );
};

export default PodcastDetailsView;

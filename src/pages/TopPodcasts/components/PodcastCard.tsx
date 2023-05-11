import { Card, Space, Typography } from "antd";
import IPodcast from "../../../models/IPodcast";
import { useNavigate } from "react-router-dom";
import '../../../styles/podcastCard.css';

const { Text } = Typography;

interface IPodcastCardProps {
  podcast: IPodcast;
}

const PodcastCard: React.FC<IPodcastCardProps> = ({ podcast }: IPodcastCardProps) => {
  const { id, title, author, image } = podcast || {};
  const navigate = useNavigate();

  const onCardClick = () => navigate(`podcast/${id}`);

  return (
    <Card data-testid="podcast-card" className="podcast-card" hoverable onClick={onCardClick}>
      <div className="card-image">
        <img src={image} />
      </div>
      <Space direction="vertical" style={{ width: '100%', marginTop: 8 }}>
        <Text strong>{title?.toUpperCase()}</Text>
        <Text type="secondary">Author: {author}</Text>
      </Space>
    </Card>
  );
};

export default PodcastCard;

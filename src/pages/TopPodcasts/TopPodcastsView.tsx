import { Row, Col, Card } from "antd";
import { useAppSettings } from "../../contexts/AppSettings";
import IPodcast from "../../models/IPodcast";
import PodcastCard from "./components/PodcastCard";
import PodcastFilterer from "./components/PodcastFilterer";

interface ITopPodcastsViewProps {
  podcasts: IPodcast[];
  onSearchChange: (keyword: string) => void;
};

const TopPodcastsView: React.FC<ITopPodcastsViewProps> = ({ podcasts, onSearchChange }) => {
  const badgeCount = podcasts?.length ?? 0;
  const { isLoading } = useAppSettings();

  return (
    <>
      <PodcastFilterer badgeCount={badgeCount} onSearchChange={onSearchChange} />
      {isLoading ?
        (
          <Row gutter={[32, 64]}>
            {[...Array(8).keys()].map((value) => {
              return (
                <Col key={value} span={6}>
                  <Card data-testid="loading-podcast-card" loading />
                </Col>
              );
            })}
          </Row>
        )
        : (
          <Row gutter={[32, 64]}>
            {podcasts?.map((podcast) => {
              return (
                <Col key={podcast.id} span={6}>
                  <PodcastCard podcast={podcast} />
                </Col>
              );
            })}
          </Row>
        )}
    </>
  )
};

export default TopPodcastsView;

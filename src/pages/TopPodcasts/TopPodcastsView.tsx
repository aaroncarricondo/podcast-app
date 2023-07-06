import { Row, Col, Card } from "antd";
import { useAppSettings } from "../../contexts/AppSettings";
import IPodcast from "../../models/IPodcast";
import PodcastCard from "./components/PodcastCard";
import PodcastFilterer from "./components/PodcastFilterer";
import '../../styles/topPodcasts.css';

interface ITopPodcastsViewProps {
  podcasts: IPodcast[];
  onSearchChange: (keyword: string) => void;
};

const columnBreakpoints = { xs: 24, sm: 12, md: 6, xxl: 4 };

const TopPodcastsView: React.FC<ITopPodcastsViewProps> = ({ podcasts, onSearchChange }) => {
  const badgeCount = podcasts?.length ?? 0;
  const { isLoading } = useAppSettings();

  return (
    <>
      <PodcastFilterer badgeCount={badgeCount} onSearchChange={onSearchChange} />
      <Row gutter={[32, 64]} className={isLoading ? 'top-podcasts-loading-row' : undefined}>
        {isLoading ?
          (
            <>
              {[...Array(8).keys()].map((value) => {
                return (
                  <Col key={value} {...columnBreakpoints}>
                    <Card data-testid="loading-podcast-card" loading />
                  </Col>
                );
              })}
            </>
          )
          : (
            <>
              {podcasts?.map((podcast) => {
                return (
                  <Col key={podcast.id} {...columnBreakpoints}>
                    <PodcastCard podcast={podcast} />
                  </Col>
                );
              })}
            </>
          )}
      </Row>
    </>
  )
};

export default TopPodcastsView;

import { useEffect, useState } from "react";
import IPodcast from "../models/IPodcast";
import { Col, Row } from "antd";
import PodcastCard from "../components/PodcastCard";
import useTopPodcasts from "../hooks/useTopPodcasts";
import { useAppSettings } from "../contexts/AppSettings";
import PodcastFilterer from "../components/PodcastFilterer";

const Main = () => {
  const { isLoading } = useAppSettings();

  const { topPodcasts } = useTopPodcasts();
  const [filteredPodcasts, setFilteredPodcasts] = useState<IPodcast[]>();

  useEffect(() => {
    setFilteredPodcasts(topPodcasts);
  }, [topPodcasts]);

  const filterPodcast = (podcast: IPodcast, value: string) => {
    const { title, author } = podcast || {};
    return title.toLowerCase().includes(value) || author.toLowerCase().includes(value);
  }

  const onSearchChange = (keyword: string) => {
    if (keyword) {
      setFilteredPodcasts(topPodcasts.filter((p) => filterPodcast(p, keyword.toLowerCase())));
    }
    else setFilteredPodcasts(topPodcasts);
  };

  return (
    <>
      <PodcastFilterer badgeCount={filteredPodcasts?.length} onSearchChange={onSearchChange} />
      {!isLoading && <Row gutter={[32, 64]}>
        {filteredPodcasts?.map((podcast) => {
          return (
            <Col key={podcast.id} span={6}>
              <PodcastCard podcast={podcast} />
            </Col>
          );
        })}
      </Row>}
    </>
  );
};

export default Main;

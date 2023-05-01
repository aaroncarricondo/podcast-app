import { ChangeEvent, useEffect, useState } from "react";
import IPodcast from "../models/IPodcast";
import { Badge, Col, Input, Row, Spin } from "antd";
import PodcastCard from "../components/PodcastCard";
import useTopPodcasts from "../hooks/useTopPodcasts";
import { useAppSettings } from "../contexts/AppSettings";

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

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e || {};
    const { value } = target || {};

    if (value) {
      setFilteredPodcasts(topPodcasts.filter((p) => filterPodcast(p, value.toLowerCase())));
    }
    else setFilteredPodcasts(topPodcasts);
  };

  return (
    <>
      {!isLoading && <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', marginBottom: 16 }}>
        <Badge color="blue" count={filteredPodcasts?.length} overflowCount={999} />
        <Input
          placeholder="Filter podcasts..."
          style={{ maxWidth: '400px', marginLeft: 16 }}
          onChange={onSearchChange}
          disabled={isLoading}
        />
      </div>}
      {!isLoading && <Row gutter={[32, 64]}>
        {filteredPodcasts?.map((podcast) => {
          const { id } = podcast || {};
          return (
            <Col key={id} span={6}>
              <PodcastCard podcast={podcast} />
            </Col>
          );
        })}
      </Row>}
    </>
  );
};

export default Main;

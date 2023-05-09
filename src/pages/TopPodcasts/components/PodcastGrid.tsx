import { Card, Col, Row } from "antd";
import PodcastCard from "./PodcastCard";
import { useAppSettings } from "../../../contexts/AppSettings";
import IPodcast from "../../../models/IPodcast";

interface IPodcastGridProps {
  podcasts: IPodcast[];
}

const PodcastGrid: React.FC<IPodcastGridProps> = ({ podcasts }: IPodcastGridProps) => {
  const { isLoading } = useAppSettings();

  return isLoading ?
    (
      <Row gutter={[32, 64]}>
        {[...Array(8).keys()].map((value) => {
          return (
            <Col key={value} span={6}>
              <Card loading />
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
    );
};

export default PodcastGrid;
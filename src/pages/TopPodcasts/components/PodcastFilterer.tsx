import { Badge, Input, Row } from "antd";
import { ChangeEvent } from "react";
import { useAppSettings } from "../../../contexts/AppSettings";
import '../../../styles/podcastFilterer.css';

interface IPodcastFiltererProps {
    badgeCount: number;
    onSearchChange: (keyword: string) => void;
}

const PodcastFilterer: React.FC<IPodcastFiltererProps> = ({ badgeCount, onSearchChange }: IPodcastFiltererProps) => {
    const { isLoading } = useAppSettings();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value);
    };

    return (
        <Row justify="end" align="middle">
            {!isLoading && <Badge color="blue" count={badgeCount} overflowCount={999} />}
            <Input
                data-testid="podcast-filterer-input"
                className="podcast-filterer-input"
                placeholder="Filter podcasts..."
                onChange={onChange}
                disabled={isLoading}
            />
        </Row>
    );
};

export default PodcastFilterer;

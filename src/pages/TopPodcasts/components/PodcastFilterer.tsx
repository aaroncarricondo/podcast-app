import { Badge, Input, Row } from "antd";
import { ChangeEvent } from "react";
import { useAppSettings } from "../../../contexts/AppSettings";

interface IPodcastFiltererProps {
    badgeCount: number;
    onSearchChange: (keyword: string) => void;
}

const PodcastFilterer: React.FC<IPodcastFiltererProps> = ({ badgeCount, onSearchChange }: IPodcastFiltererProps) => {
    const { isLoading } = useAppSettings();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { target } = e || {};
        const { value } = target || {};
        onSearchChange(value);
    };

    return (
        <Row justify="end" align="middle">
            {!isLoading && <Badge color="blue" count={badgeCount} overflowCount={999} />}
            <Input
                placeholder="Filter podcasts..."
                style={{ maxWidth: '400px', marginLeft: 16 }}
                onChange={onChange}
                disabled={isLoading}
            />
        </Row>
    );
};

export default PodcastFilterer;

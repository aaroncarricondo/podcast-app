import IPodcast from "../../models/IPodcast";
import PodcastFilterer from "./components/PodcastFilterer";
import PodcastGrid from "./components/PodcastGrid";

interface ITopPodcastsViewProps {
  podcasts: IPodcast[];
  onSearchChange: (keyword: string) => void;
};

const TopPodcastsView: React.FC<ITopPodcastsViewProps> = ({ podcasts, onSearchChange }) => {
  const badgeCount = podcasts?.length ?? 0;

  return (
    <>
      <PodcastFilterer badgeCount={badgeCount} onSearchChange={onSearchChange} />
      <PodcastGrid podcasts={podcasts} />
    </>
  )
};

export default TopPodcastsView;

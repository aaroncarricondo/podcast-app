import { Typography } from "antd";
import '../styles/notFound.css';

const { Title } = Typography;

const PageNotFound = () => {
  return (
    <div className="not-found-container">
      <Title>404</Title>
      <Title level={3}>Page not found</Title>
    </div>
  );
};

export default PageNotFound;
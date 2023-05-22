import { Layout, Spin, Typography, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSettings } from "../contexts/AppSettings";

import '../styles/appLayout.css';

const { Header, Content } = Layout;
const { Title } = Typography;
const { useToken } = theme;

const AppLayout = () => {
  const { token } = useToken();

  const navigate = useNavigate();
  const { isLoading } = useAppSettings();

  return (
    <Layout>
      <Header className="app-layout-header">
        <Title className="clickable app-layout-title" level={3} color="blue" style={{ color: token.colorPrimary }} onClick={() => navigate('/')}>
          Podcaster
        </Title>
        {isLoading && <Spin data-testid="loading-layout-spin" />}
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AppLayout;

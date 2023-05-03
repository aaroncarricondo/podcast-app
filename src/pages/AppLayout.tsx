import { Layout, Spin, Typography, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSettings } from "../contexts/AppSettings";

import '../styles/appLayout.css';

const { Header } = Layout;
const { Title } = Typography;
const { useToken } = theme;

const AppLayout = () => {
  const { token } = useToken();

  const navigate = useNavigate();
  const { isLoading } = useAppSettings();

  return (
    <Layout>
      <Header className="app-layout-header">
        <Title className="clickable" level={3} color="blue" style={{ margin: 0, color: token.colorPrimary }} onClick={() => navigate('/')}>
          Podcaster
        </Title>
        {isLoading && <Spin />}
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AppLayout;

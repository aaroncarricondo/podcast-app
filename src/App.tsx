/* istanbul ignore file */

import { ConfigProvider } from "antd"
import { AppSettingsProvider } from "./contexts/AppSettings";
import AppRoutes from "./navigation";
import './styles/styles.css';

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgLayout: 'none',
          borderRadius: 4,
        },
      }}
    >
      <AppSettingsProvider>
        <AppRoutes />
      </AppSettingsProvider>
    </ConfigProvider>
  );
};

export default App;
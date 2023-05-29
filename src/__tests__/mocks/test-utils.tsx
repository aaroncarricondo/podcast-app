import { RenderOptions, render } from "@testing-library/react";
import { AppSettingsProvider } from "../../contexts/AppSettings";

export const wrapper = ({ children }) => <AppSettingsProvider>{children}</AppSettingsProvider>;

export const renderWithWrapper =
  (ui: React.ReactElement, options?: Omit<RenderOptions, 'queries' | 'wrapper'>) => render(ui, { wrapper, ...(options || {}) });

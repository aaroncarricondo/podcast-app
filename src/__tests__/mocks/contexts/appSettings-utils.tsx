import { Queries, RenderHookOptions, RenderOptions, queries, render, renderHook } from '@testing-library/react';
import { AppSettingsProvider } from '../../../contexts/AppSettings';
import * as AppSettings from '../../../contexts/AppSettings';

const wrapper = ({ children }) => <AppSettingsProvider>{children}</AppSettingsProvider>;

export const renderWithWrapper =
  (ui: React.ReactElement, options?: Omit<RenderOptions, 'queries' | 'wrapper'>) => render(ui, { wrapper, ...(options || {}) });

export const renderHookWithWrapper = <
  Result,
  Props,
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container,
>(
  render: (initialProps: Props) => Result,
  options?: Omit<RenderHookOptions<Props, Q, Container, BaseElement>, 'wrapper'>,
) => renderHook(render, { wrapper, ...options });

const mockedAppSettingsReturn = (isLoading = false) => {
  return {
    removeOperation: jest.fn(),
    addOperation: jest.fn(),
    isLoading,
  };
};

export const spyOnAppSettings = (isLoading = false) => jest.spyOn(AppSettings, 'useAppSettings')
  .mockImplementation(() => mockedAppSettingsReturn(isLoading));

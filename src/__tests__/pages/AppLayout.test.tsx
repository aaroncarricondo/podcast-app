import { fireEvent, render, screen } from '@testing-library/react';
import AppLayout from '../../pages/AppLayout';
import { BrowserRouter } from 'react-router-dom';
import MockedMemoryRouter from '../mocks/MemoryRouter';
import { spyOnAppSettings } from '../mocks/contexts/appSettings-utils';

describe('App layout', () => {
  spyOnAppSettings(true);

  it('should render a header with application name', () => {
    render(<AppLayout />, { wrapper: BrowserRouter });

    expect(screen.queryByText('Podcaster')).toBeTruthy();
  });

  it('should navigate to root when application name clicked', () => {
    const testRouteText = 'Navigate';
    render(
      <MockedMemoryRouter
        initialEntries={[`/podcast/:podcastId`]}
        mainRouteProps={{
          path: '/podcast/:podcastId',
          element: <AppLayout />,
        }}
        otherRoutesProps={[
          {
            path: '/',
            element: testRouteText,
          }
        ]}
      />
    );

    fireEvent.click(screen.queryByText('Podcaster'));

    expect(screen.queryByText(testRouteText)).toBeTruthy();
  });

  it('should show a spinner if some loadingOperation is being performed', () => {
    render(<AppLayout />, { wrapper: BrowserRouter });

    expect(screen.getByTestId('loading-layout-spin')).toBeTruthy();
  });
});
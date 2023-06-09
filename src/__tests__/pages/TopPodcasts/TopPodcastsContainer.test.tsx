import { fireEvent, render, screen } from '@testing-library/react';

import * as useTopPodcasts from '../../../hooks/useTopPodcasts';
import TopPodcasts from '../../../pages/TopPodcasts';
import { getMockedPodcasts } from '../../data/podcastsData';
import { BrowserRouter } from 'react-router-dom';
import { spyOnAppSettings } from '../../mocks/contexts/appSettings-utils';

const topPodcasts = getMockedPodcasts(10, true);
const { length } = topPodcasts;
jest.spyOn(useTopPodcasts, 'default')
  .mockImplementation(() => ({
    topPodcasts,
    getPodcastById: jest.fn(),
  }));

describe('Top podcast container', () => {
  spyOnAppSettings(false);

  it('should render the top podcasts with its basic information', () => {
    render(<TopPodcasts />, { wrapper: BrowserRouter });

    expect(screen.getAllByTestId('podcast-card')).toHaveLength(length);
  });

  it('should filter top podcast by text input (ignoring case)', () => {
    render(<TopPodcasts />, { wrapper: BrowserRouter });

    expect(screen.getAllByTestId('podcast-card')).toHaveLength(length);

    // Text some value to filter
    const input = screen.getByTestId('podcast-filterer-input');
    fireEvent.change(input, { target: { value: 'JOHN' } });
    expect(screen.getAllByTestId('podcast-card')).toHaveLength(1);

    // Show all podcasts again when delete the input
    fireEvent.change(input, { target: { value: '' } });
    expect(screen.getAllByTestId('podcast-card')).toHaveLength(length);
  });
});
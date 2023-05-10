import { render, screen } from '@testing-library/react';
import NotFound from '../../pages/NotFound';

describe('Not found page', () => {
  it('should render not found text', () => {
    render(<NotFound />);

    expect(screen.queryByText('Page not found')).toBeTruthy();
  });
});
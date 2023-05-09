import PageChunkLoader from '../../components/PageChunkLoader';
import { render } from '@testing-library/react';

describe('Page chunk loader component', () => {
  it('should render a Spin', () => {
    const { container } = render(<PageChunkLoader />);

    expect(container.querySelector('.ant-spin')).toBeTruthy();
  });
});
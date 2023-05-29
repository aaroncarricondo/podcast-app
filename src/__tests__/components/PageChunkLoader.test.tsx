import PageChunkLoader from '../../components/PageChunkLoader';
import { renderWithWrapper } from '../mocks/test-utils';

describe('Page chunk loader component', () => {
  it('should render a Spin', () => {
    const { container } = renderWithWrapper(<PageChunkLoader />);

    expect(container.querySelector('.ant-spin')).toBeTruthy();
  });
});
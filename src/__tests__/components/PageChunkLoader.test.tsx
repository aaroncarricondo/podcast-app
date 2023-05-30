import PageChunkLoader from '../../components/PageChunkLoader';
import { renderWithWrapper } from '../mocks/contexts/appSettings-utils';

describe('Page chunk loader component', () => {
  it('should render a Spin', () => {
    const { container } = renderWithWrapper(<PageChunkLoader />);

    expect(container.querySelector('.ant-spin')).toBeTruthy();
  });
});
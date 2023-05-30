import { MemoryRouter, Route, Routes, RouteProps } from 'react-router-dom';
import { InitialEntry } from '@remix-run/router';

interface IMemoryRouterProps {
  initialEntries?: InitialEntry[];
  mainRouteProps: RouteProps;
  otherRoutesProps?: RouteProps[];
}

const MockedMemoryRouter = ({ initialEntries = ['home'], mainRouteProps, otherRoutesProps }: IMemoryRouterProps) => {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route {...mainRouteProps} />
        {otherRoutesProps?.map((rp, index) => {
          return <Route key={index} {...rp} />;
        })}
      </Routes>
    </MemoryRouter>
  );
};

export default MockedMemoryRouter;
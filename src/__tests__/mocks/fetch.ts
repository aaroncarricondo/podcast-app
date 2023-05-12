export const getMockedFetch = (response: Partial<Response>) => {
  return jest.fn(() =>
    Promise.resolve({
      ...response,
    })
  );
};
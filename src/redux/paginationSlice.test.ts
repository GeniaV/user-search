import paginationReducer, { setPageNumber } from './paginationSlice';

describe('Pagination reducer', () => {
  const initialState = {
    page: 1,
  };

  it('should handle initial state', () => {
    expect(paginationReducer(undefined, { type: 'unknown' })).toEqual({
      page: 1,
    });
  });

  it('should handle setPageNumber', () => {
    const actual = paginationReducer(initialState, setPageNumber(2));
    expect(actual.page).toEqual(2);
  });
});

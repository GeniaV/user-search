import { getPagesArray } from "./functions";

describe('GetPagesArray function', () => {
  it('should return correct array when current page is near the start', () => {
    const pages = getPagesArray({ currentPage: 2, totalPages: 10 });
    expect(pages).toEqual([1, 2, 3, 4, "...", 10]);
  });

  it('should return correct array when current page is near the end', () => {
    const pages = getPagesArray({ currentPage: 9, totalPages: 10 });
    expect(pages).toEqual([1, "...", 7, 8, 9, 10]);
  });

  it('should return correct array when current page is in the middle', () => {
    const pages = getPagesArray({ currentPage: 5, totalPages: 10 });
    expect(pages).toEqual([1, "...", 3, 4, 5, 6, 7, "...", 10]);
  });

  it('should handle situation with totalPages equals to 1', () => {
    const pages = getPagesArray({ currentPage: 1, totalPages: 1 });
    expect(pages).toEqual([1]);
  });
});

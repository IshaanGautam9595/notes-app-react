const SortbyNewestFirst = (array) =>
  array.sort(function (a, b) {
    return new Date(a.reviewDate) - new Date(b.reviewDate);
  });
const SortbyOldestFirst = (array) =>
  array &&
  array.sort(function (a, b) {
    return new Date(b.reviewDate) - new Date(a.reviewDate);
  });
export { SortbyNewestFirst, SortbyOldestFirst };

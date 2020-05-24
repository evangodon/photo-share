const arrayMoveMutate = (array, from, to) => {
  const startIndex = to < 0 ? array.length + to : to;
  const item = array.splice(from, 1)[0];
  array.splice(startIndex, 0, item);
};

export const arrayMove = (array, from, to) => {
  const copy = [...array];
  arrayMoveMutate(copy, from, to);
  return copy;
};

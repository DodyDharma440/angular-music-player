export const mergeRemoveDuplicates = <T>(
  data: T[],
  newData: T[],
  checkExist: (d: T, curr: T) => boolean
) => {
  const _data = [...data, ...newData];
  const reduced = _data.reduce((prev: T[], curr) => {
    const isExist = prev.some((p) => checkExist(p, curr));
    if (!isExist) {
      prev.push(curr);
    }
    return prev;
  }, []);

  return reduced;
};

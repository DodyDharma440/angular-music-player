export const mergeRemoveDuplicates = <T>(
  data: T[],
  newData: T[],
  checkExist: keyof T | ((d: T, curr: T) => boolean)
) => {
  const _data = [...data, ...newData];
  const reduced = _data.reduce((prev: T[], curr) => {
    const isExist = prev.some((p) =>
      checkExist instanceof Function
        ? checkExist(p, curr)
        : p[checkExist] === curr[checkExist]
    );
    if (!isExist) {
      prev.push(curr);
    }
    return prev;
  }, []);

  return reduced;
};

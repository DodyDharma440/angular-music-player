export const serialize = function <T extends Object>(obj: T) {
  let str = [];
  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(
        encodeURIComponent(p) +
          '=' +
          encodeURIComponent(obj[p as keyof T] as any)
      );
    }
  }
  return str.join('&');
};

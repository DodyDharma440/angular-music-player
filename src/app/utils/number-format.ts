export const compactNumber = (value?: string | number) => {
  const newValue = Number(value || 0);
  const formatter = new Intl.NumberFormat('en-US', { notation: 'compact' });
  return formatter.format(newValue);
};

export const thousandsFormat = (value: number | string, separator?: string) => {
  return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator || ',');
};

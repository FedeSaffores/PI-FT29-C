export const ordAlf = (a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};
export const ordweight = (a, b) => {
  return parseInt(b.weight?.split("-")[1]) - parseInt(a.weight?.split("-")[1]);
};

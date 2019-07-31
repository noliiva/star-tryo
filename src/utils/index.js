export const extractVehicleId = (url) => {
  const res = /^https:\/\/swapi\.co\/api\/vehicles\/(\d+)\/$/.exec(url) || [];
  return Number(res[1]) || null;
};

export const extractPeopleId = (url) => {
  const res = /^https:\/\/swapi\.co\/api\/people\/(\d+)\/$/.exec(url) || [];
  return Number(res[1]) || null;
};

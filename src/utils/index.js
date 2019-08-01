export const extractId = (key, url) => {
  const regexp = new RegExp(`^https:\\/\\/swapi\\.co\\/api\\/${key}\\/(\\d+)\\/$`);
  const res = regexp.exec(url) || [];
  return Number(res[1]) || null;
};

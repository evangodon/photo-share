export const getTitleFromSlug = (slug: string) => {
  return slug.split('-')[0];
};

export const getIdFromSlug = (slug: string) => {
  return slug.split('-')[1];
};

export const getTitleFromSlug = (slug: string) => {
  return slug.split('-')[0];
};

export const getIdFromSlug = (slug: string) => {
  return slug.split('-').pop();
};

export const createSlug = (entity: { _id: string; title: string }) => {
  const { _id, title } = entity;

  return `${title.replace(/\s/g, '-').toLowerCase()}-${_id}`;
};

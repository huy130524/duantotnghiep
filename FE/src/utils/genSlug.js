import slugify from "slugify";

export const genSlug = (value = "") => {
  return slugify(value, {
    locale: "vi",
    lower: true,
  });
};

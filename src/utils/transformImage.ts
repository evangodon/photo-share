type Parameters = {
  width: number;
  height: number;
};

const mapToFlag: { [key in keyof Parameters]: string } = {
  width: 'w_',
  height: 'h_',
};

/**
 *
 * @todo: Add height option
 */
type TransformImage = (src: string, params: Partial<Parameters>) => string;

export const transformImage: TransformImage = (src, options = {}) => {
  const transformations = Object.entries(options)
    .map((entry) => {
      return mapToFlag[entry[0]] + entry[1];
    })
    .join();

  const cloudinaryParams = `f_auto,c_scale,${transformations}`;

  const transformedString = src.replace(
    'upload/',
    `upload/${cloudinaryParams}/`
  );

  return transformedString;
};

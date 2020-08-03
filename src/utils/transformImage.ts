type Options = {
  width: number;
  height: number;
  blur: number;
  quality: 'auto' | 'best' | 'low';
};

const mapToFlag: { [key in keyof Options]: string } = {
  width: 'w_',
  height: 'h_',
  blur: 'e_blur:',
  quality: 'q_auto:',
};

/**
 *
 * @todo: Add height option
 */
type TransformImage = (src: string, options: Partial<Options>) => string;

export const transformImage: TransformImage = (src, options = {}) => {
  const transformations = Object.entries(options)
    .map((entry) => {
      return mapToFlag[entry[0]] + entry[1];
    })
    .join();

  const cloudinaryParams = `f_auto,c_scale,${transformations}`;

  const transformedString = src.replace('upload/', `upload/${cloudinaryParams}/`);

  return transformedString;
};

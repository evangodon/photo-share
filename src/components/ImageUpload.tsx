import { useRef } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import { env } from '@/constants';

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageTransform
);

type Props = {
  handlePhotoUpload: (url: string) => void;
  setFiles?: (files: File[]) => void;
};

const FOLDER = env.is.prod ? 'prod' : 'dev';
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/dnlc9ln3m/upload?folder=${FOLDER}`;

/**
 * @todo: Find the right width to resize to
 * @todo: Fix drag and dropping multiple photos
 * @todo: Handle Delete
 */
const ImageUpload = ({ handlePhotoUpload, setFiles }: Props) => {
  const filesRef = useRef([]);

  return (
    <>
      <FilePond
        allowMultiple={true}
        maxFiles={20}
        imageResizeTargetWidth={1200}
        allowImageTransform
        imageCropAspectRatio={1}
        imageTransformAfterCreateBlob={(blob) => {
          filesRef.current.push(new File([blob], blob.name));
          return blob;
        }}
        server={{
          url: CLOUDINARY_UPLOAD_URL,
          process: {
            method: 'POST',
            ondata: (formData) => {
              formData.append('upload_preset', 'hws3enju');
              formData.append('file', filesRef.current.pop());
              formData.delete('filepond');

              return formData;
            },
            onload: (response) => {
              const json: { secure_url: string } = JSON.parse(response);

              handlePhotoUpload(json.secure_url);
            },
          },
        }}
      />

      <style global jsx>{`
        .filepond--item {
          width: calc(25% - 0.5rem);
        }

        .filepond--root {
          min-height: 80em;
        }

        .filepond--panel-root {
          min-height: 30rem;
        }

        .filepond--drop-label {
          margin-top: 3rem;
        }

        .filepond--drop-label label {
          color: #555;
          font-size: var(--fs-medium);
        }
      `}</style>
    </>
  );
};

export default ImageUpload;

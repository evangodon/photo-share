import { useRef, useState, useEffect } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { kIsNormalizedAlready } from 'got/dist/source/core';

registerPlugin(FilePondPluginImagePreview);

type Props = {
  handlePhotoUpload: (photo: { url: string }) => void;
  files: File[];
  setFiles: (files: File[]) => void;
};

/**
 * @todo: Handle Delete
 * @todo: Resize image before uploading to cloudinary
 */
const ImageUpload = ({ handlePhotoUpload, setFiles }: Props) => {
  const filesRef = useRef([]);

  return (
    <>
      <FilePond
        allowMultiple={true}
        maxFiles={20}
        onupdatefiles={(fileItems) => {
          fileItems.forEach((item) => filesRef.current.push(item.file));

          setFiles(fileItems.map((fileItem) => fileItem.file));
        }}
        server={{
          url: `https://api.cloudinary.com/v1_1/dnlc9ln3m/upload`,
          process: {
            method: 'POST',
            ondata: (formData) => {
              formData.append('upload_preset', 'hws3enju');
              formData.append('file', filesRef.current.pop());
              formData.delete('filepond');

              return formData;
            },
            onload: (response) => {
              const json = JSON.parse(response);

              handlePhotoUpload({ url: json.secure_url });
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

import { useRef, useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

registerPlugin(FilePondPluginImagePreview);

/**
 * @todo: Clean up code
 * @todo: Handle Delete
 * @todo: Resize image before uploading to cloudinary
 */
const ImageUpload = () => {
  const ref = useRef();
  const [files, setFiles] = useState([]);

  return (
    <>
      <FilePond
        files={files}
        allowMultiple={true}
        maxFiles={3}
        onupdatefiles={(fileItems) => {
          ref.current = fileItems[0]?.file;

          setFiles(fileItems.map((fileItem) => fileItem.file));
        }}
        server={{
          url: `https://api.cloudinary.com/v1_1/dnlc9ln3m/upload`,
          process: {
            method: 'POST',
            ondata: (formData) => {
              formData.append('upload_preset', 'hws3enju');
              formData.append('file', ref.current);
              formData.delete('filepond');

              return formData;
            },
          },
        }}
      />
    </>
  );
};

export default ImageUpload;

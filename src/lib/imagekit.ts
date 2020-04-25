import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  publicKey: 'your_public_api_key',
  privateKey: 'your_private_api_key',
  urlEndpoint: 'https://ik.imagekit.io/your_imagekit_id/',
});

export { imagekit };

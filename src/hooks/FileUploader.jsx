// components/FileUploader.js
import React from 'react';
import useIpfs from './useIPFS';
import { storeIpfsUrl } from './weaveDB';

const FileUploader = () => {
  const { uploadToIPFS, ipfsUrl } = useIpfs();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await uploadToIPFS(file);
      if (ipfsUrl) {
        await storeIpfsUrl(ipfsUrl);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {ipfsUrl && <p>IPFS URL: <a href={ipfsUrl} target="_blank" rel="noopener noreferrer">{ipfsUrl}</a></p>}
    </div>
  );
};

export default FileUploader;


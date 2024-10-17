import React, { createContext, useContext, useState, useEffect } from 'react';
import { NFTStorage, File } from 'nft.storage';

const IPFSContext = createContext(null);

export const useIPFS = () => useContext(IPFSContext);

export const IPFSProvider = ({ children }) => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const initClient = () => {
      const client = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_API });
      setClient(client);
    };

    initClient();
  }, []);

  const uploadToIPFS = async (data) => {
    if (!client) throw new Error('IPFS client not initialized');
    
    try {
      const { name, description, image } = data;
      const metadata = {
        name,
        description,
        image: new File([image], 'image.png', { type: 'image/png' }),
      };

      const cid = await client.store(metadata);
      return `https://ipfs.io/ipfs/${cid}`;
    } catch (error) {
      console.error("Failed to upload to IPFS:", error);
      throw error;
    }
  };

  return (
    <IPFSContext.Provider value={{ uploadToIPFS }}>
      {children}
    </IPFSContext.Provider>
  );
};

import { NFTStorage } from "nft.storage";

const useIPFS = async (
  personalData,
  userImage,
  identificationData,
  identificationDoc,
  medicalCouncilData,
  councilFile,
  preference
) => {
  try {
    const nftStorage = new NFTStorage({
      token: process.env.NEXT_PUBLIC_NFT_STORAGE_API || "",
    });

    const link = await nftStorage.store({
      image: userImage,
      name: personalData.name,
      description: personalData.about || "",
      about: personalData.about || "",
      address: personalData.address,
      city: personalData.city,
      dob: personalData.dob,
      gender: personalData.gender,
      state: personalData.state,
      docNumber: identificationData.docNumber,
      docType: identificationData.docType,
      identificationDoc: identificationDoc,
      councilNumber: medicalCouncilData.councilNumber,
      specialization: medicalCouncilData.specialization,
      councilFile: councilFile,
      minAmount: preference.minAmount,
      callType: preference.callType,
      date: preference.date,
      days: preference.days,
      startTime: preference.startTime,
      language: preference.language,
      endTime: preference.endTime,
    });

    const ipfsURL = `https://ipfs.io/ipfs/${link.url.substr(7)}`;
    return ipfsURL;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw error;
  }
};

export default useIPFS;

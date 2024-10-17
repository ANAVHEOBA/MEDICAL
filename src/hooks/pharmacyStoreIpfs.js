import { NFTStorage } from "nft.storage";

const usePharmacyIPFs = async (
  pharmacyData,
  pharmacyImage,
  pharmacyOwnerData,
  pharmacyOwnerImage,
  pharmacyVerificationData,
  pharmacyVerificationDoc,
  pharmacyPreferenceData
) => {
  try {
    const nftStorage = new NFTStorage({
      token: process.env.NEXT_PUBLIC_NFT_STORAGE_API || "",
    });

    const link = await nftStorage.store({
      image: pharmacyImage,
      name: pharmacyData.name,
      description: pharmacyData.about || "",
      address: pharmacyData.address,
      city: pharmacyData.city,
      state: pharmacyData.state,

      ownerImage: pharmacyOwnerImage,
      ownerName: pharmacyOwnerData.name,
      gender: pharmacyOwnerData.gender,
      dob: pharmacyOwnerData.dob,
      ownerCity: pharmacyOwnerData.city,
      ownerState: pharmacyOwnerData.state,
      ownerAbout: pharmacyOwnerData.about,

      pharmacyVerificationDoc: pharmacyVerificationDoc,
      councilNumber: pharmacyVerificationData.councilNumber,
      medicineSpecialization: pharmacyVerificationData.medicineSpecialization,

      openDays: pharmacyPreferenceData.openDays,
      startTime: pharmacyPreferenceData.startTime,
      endTime: pharmacyPreferenceData.endTime,
    });

    const ipfsURL = `https://ipfs.io/ipfs/${link.url.substr(7)}`;
    return ipfsURL;
  } catch (error) {
    return error;
  }
};

export default usePharmacyIPFs;

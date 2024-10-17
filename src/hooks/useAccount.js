import { useAccount as useWagmiAccount } from "wagmi";
import { useEffect, useState } from "react";

const useAccount = () => {
  const { address } = useWagmiAccount();
  const [currentAddress, setCurrentAddress] = useState(address);

  useEffect(() => {
    if (address && address !== currentAddress) {
      setCurrentAddress(address);
    }
  }, [address, currentAddress]);

  return { currentAddress };
};

export default useAccount;

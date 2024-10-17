import HuddleMeeting from "@/components/HuddleMeeting/HuddleMeeting";
import { useAccount } from "wagmi";


export default function Home() {
  const { address } = useAccount();
  if (!address) return null;

  return (
    <>
      <HuddleMeeting doctorAddress={address?.toLowerCase()} />
    </>
  );
}

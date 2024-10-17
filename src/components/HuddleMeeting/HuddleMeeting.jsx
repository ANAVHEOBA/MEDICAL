import { HuddleIframe } from "@huddle01/huddle01-iframe";

const HuddleMeeting = ({ doctorAddress }) => {
  const iframeConfig = {
    roomUrl: `https://iframe.huddle01.com/${doctorAddress}`,
    height: "700px",
    width: "100%",
    noBorder: true,
  };

  return (
    <div>
      <HuddleIframe config={iframeConfig} />
    </div>
  );
};

export default HuddleMeeting;

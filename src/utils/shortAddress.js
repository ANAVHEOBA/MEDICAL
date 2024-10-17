const shortAddress = (address) => {
    return `${address.substr(0, 4)}...${address.substr(38, 42)}`;
  };
  
  export default shortAddress;
  
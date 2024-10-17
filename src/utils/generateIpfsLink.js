const generateIpfsMediaLink = (link) => {
    return `https://ipfs.io/ipfs/${link.substr(7)}`;
}

export default generateIpfsMediaLink;

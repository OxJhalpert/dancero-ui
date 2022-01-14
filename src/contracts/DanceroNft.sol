// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DanceroNft is ERC721 {
    uint256 token_count;

    constructor() ERC721("Dancero NFT", "DNFT") {}

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return "https://ipfs.io/ipfs/QmRNSHtnyiUHfmNiLEGxMUSvmAZQdyQ6PXR9myyzdU4fyT";
    }

    function mintNFT(address to) public
    {
        token_count  += 1;
        _mint(to, token_count);
    }
}
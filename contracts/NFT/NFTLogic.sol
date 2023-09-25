// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./EternalStorage.sol";

contract NFTLogic is EternalStorage {
  constructor(address _forwarder) EternalStorage("NFT", "NFT", _forwarder) {}

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }

  /**
   * @notice Mint one token
   * @param to Destination address for new token
   * @param uri Json Metadata Uri string for new token
   */
  function safeMint(address to, string memory uri) public onlyOwner {
    uint256 tokenId = tokenIdCounter;
    tokenIdCounter++;
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, uri);
  }

  /**
   * @notice Set Royalty receiver and fee
   * @param receiver Royalty Receiver address
   * @param royaltyFeesInBips Royalty Fee Amount
   */
  function setRoyaltyInfo(address receiver, uint96 royaltyFeesInBips)
    public
    onlyOwner
  {
    _setDefaultRoyalty(receiver, royaltyFeesInBips);
  }
}

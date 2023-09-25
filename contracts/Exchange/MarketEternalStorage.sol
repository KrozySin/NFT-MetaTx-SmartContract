// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MarketEternalStorage is Ownable {
  /**
   * @notice Mapping storage for sell requests
   */
  mapping(address => mapping(uint256 => uint256)) internal sellRequests; // owner => tokenAddress => tokenId => price

  /**
   * @notice Mapping storage for payer's addresses
   */
  mapping(address => mapping(uint256 => mapping(address => uint256)))
    internal paymentInfoMap; // owner => tokenAddress => tokenId => address
}

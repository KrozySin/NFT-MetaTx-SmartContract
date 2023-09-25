// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./MarketEternalStorage.sol";

contract MarketLogic is MarketEternalStorage {
  /**
   * @dev List ERC721 token on market(This service).
   * List ERC721 token with price
   */
  function sellRequest(
    address token,
    uint256 tokenId,
    uint256 price
  ) public {
    require(
      IERC721(token).getApproved(tokenId) == address(this),
      "Not approved yet."
    );
    require(
      IERC721(token).ownerOf(tokenId) == msg.sender,
      "Only owner can request."
    );

    sellRequests[token][tokenId] = price;
  }

  /**
   * @dev Set payment status of ERC721 token
   */
  function setPaymentStatus(
    address token,
    uint256 tokenId,
    address owner,
    uint256 payment,
    address paymentAddress,
    uint256 status
  ) public onlyOwner {
    require(
      IERC721(token).getApproved(tokenId) == address(this),
      "Not approved yet."
    );

    require(
      IERC721(token).ownerOf(tokenId) == owner,
      "Only owner can request."
    );

    require(
      sellRequests[token][tokenId] == payment,
      "Payment amount is incorrect."
    );
    paymentInfoMap[token][tokenId][paymentAddress] = status;
  }

  /**
   * @dev Claim token after the payment
   */
  function claimToken(
    address token,
    uint256 tokenId,
    address toAddress
  ) public onlyOwner {
    require(
      IERC721(token).getApproved(tokenId) == address(this),
      "Not approved yet."
    );

    require(paymentInfoMap[token][tokenId][toAddress] == 1, "Not payed yet.");

    IERC721(token).safeTransferFrom(
      IERC721(token).ownerOf(tokenId),
      toAddress,
      tokenId
    );

    delete sellRequests[token][tokenId];
    delete paymentInfoMap[token][tokenId][toAddress];
  }
}

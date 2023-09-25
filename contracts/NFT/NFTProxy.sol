// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "./EternalStorage.sol";

contract NFTProxy is EternalStorage, ERC1967Proxy {
  /**
   * @notice Proxy Manager
   */
  address internal immutable _manager;

  constructor(
    uint96 _royaltyFeesInBips,
    address _logic,
    address _forwarder,
    bytes memory _data
  ) EternalStorage("NFT", "NFT", _forwarder) ERC1967Proxy(_logic, _data) {
    _setDefaultRoyalty(msg.sender, _royaltyFeesInBips);
    _manager = msg.sender;
  }

  function upgradeImplementation(address _impl) public {
    _upgradeTo(_impl);
  }
}

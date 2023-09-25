// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "./MarketEternalStorage.sol";

contract MarketProxy is MarketEternalStorage, ERC1967Proxy {
  /**
   * @notice Proxy Manager
   */
  address internal immutable _manager;

  constructor(address _logic, bytes memory _data) ERC1967Proxy(_logic, _data) {
    _manager = msg.sender;
  }

  function upgradeImplementation(address _impl) public {
    _upgradeTo(_impl);
  }
}

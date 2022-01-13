// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UsdcToken  is ERC20, Ownable {
    constructor() ERC20("Usdc token", "USDC") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}

//0x413e1A7a3702756588857259e4a55Bd2E272cE4b
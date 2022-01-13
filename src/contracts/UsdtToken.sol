// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UsdtToken  is ERC20, Ownable {
    constructor() ERC20("Usdt token", "USDT") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}

//0x649C680dF9a192d9eE1F4Ed368962914dc3EF8c4
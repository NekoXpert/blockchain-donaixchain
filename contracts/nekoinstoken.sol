// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract nekoinsToken is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 40_000_000 * 10**18;
    uint256 public constant MAX_SUPPLY = 100_000_000 * 10**18;
    uint256 public constant YEARLY_MINT = 10_000_000 * 10**18;
    uint256 public constant BURN_RATE = 5; // 0.5% (5 / 1000)

    uint256 public lastMintedYear;

    constructor() ERC20("NEKOINS", "NEK") {
        _mint(msg.sender, INITIAL_SUPPLY);
        lastMintedYear = block.timestamp;
    }

    function mintAnnual() external onlyOwner {
        require(totalSupply() + YEARLY_MINT <= MAX_SUPPLY, "Exceeds max supply");
        require(block.timestamp >= lastMintedYear + 365 days, "Wait until next year");
        _mint(msg.sender, YEARLY_MINT);
        lastMintedYear = block.timestamp;
    }

    function _transfer(address from, address to, uint256 amount) internal override {
        uint256 burnAmount = (amount * BURN_RATE) / 1000;
        uint256 sendAmount = amount - burnAmount;
        super._transfer(from, address(0), burnAmount); // burn
        super._transfer(from, to, sendAmount);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NekoinsToken is ERC20, Ownable {
    uint256 public maxSupply = 100_000_000 * 10**18;
    uint256 public annualEmission = 10_000_000 * 10**18;
    uint256 public lastEmissionTime;
    uint256 public burnRate = 5; // 0.5% (5 / 1000)

    constructor() ERC20("NEKOINS", "NEK") Ownable(msg.sender) {
        _mint(msg.sender, 40_000_000 * 10**18); // Initial emission
        lastEmissionTime = block.timestamp;
    }

    function _transfer(address from, address to, uint256 amount) internal override {
        uint256 burnAmount = (amount * burnRate) / 1000;
        uint256 sendAmount = amount - burnAmount;
        
        // Burn tokens by reducing total supply
        _burn(from, burnAmount);
        
        // Transfer the remaining amount
        super._transfer(from, to, sendAmount);
    }

    function emitAnnualTokens(address to) external onlyOwner {
        require(totalSupply() + annualEmission <= maxSupply, "Max supply exceeded");
        require(block.timestamp >= lastEmissionTime + 365 days, "Emission not ready");
        
        _mint(to, annualEmission);
        lastEmissionTime = block.timestamp;
    }
}
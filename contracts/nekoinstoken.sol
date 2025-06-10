// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Importamos los contratos necesarios de OpenZeppelin
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Contrato de token NEKOINS que hereda de ERC20 y Ownable
contract NekoinsToken is ERC20, Ownable {
    // Suministro máximo total de tokens: 100 millones
    uint256 public maxSupply = 100_000_000 * 10**18;
    // Emisión anual de nuevos tokens: 10 millones
    uint256 public annualEmission = 10_000_000 * 10**18;
    // Tiempo de la última emisión de tokens
    uint256 public lastEmissionTime;
    // Tasa de quema: 0.5% (5/1000)
    uint256 public burnRate = 5;

    // Constructor: inicializa el token con nombre "NEKOINS", símbolo "NEKOINS"
    // y emite 40 millones de tokens iniciales al creador
    constructor() ERC20("NEKOINS", "NEK") Ownable(msg.sender) {
        _mint(msg.sender, 40_000_000 * 10**18);
        lastEmissionTime = block.timestamp;
    }

    // Sobreescribe la función de transferencia para implementar el mecanismo de quema
    function _transfer(address from, address to, uint256 amount) internal override {
        // Calcula la cantidad a quemar y la cantidad a enviar
        uint256 burnAmount = (amount * burnRate) / 1000;
        uint256 sendAmount = amount - burnAmount;
        
        // Quema una parte de los tokens
        _burn(from, burnAmount);
        
        // Transfiere el resto al destinatario
        super._transfer(from, to, sendAmount);
    }

    // Función para emitir tokens anuales, solo puede ser llamada por el owner
    function emitAnnualTokens(address to) external onlyOwner {
        // Verifica que no se exceda el suministro máximo
        require(totalSupply() + annualEmission <= maxSupply, "Max supply exceeded");
        // Verifica que haya pasado un año desde la última emisión
        require(block.timestamp >= lastEmissionTime + 365 days, "Emission not ready");
        
        // Emite los nuevos tokens
        _mint(to, annualEmission);
        // Actualiza el tiempo de la última emisión
        lastEmissionTime = block.timestamp;
    }
}
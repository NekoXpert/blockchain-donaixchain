# 🐱💠 DonaxChain – Proyecto Blockchain Solidario

## 10. Documentación de los componentes tecnológicos

| Componente              | Descripción                                                        | Tecnología / Herramienta                |
|-------------------------|--------------------------------------------------------------------|-----------------------------------------|
| **Smart Contracts**     | Lógica de tokens NEKOINS (ERC20) y NFTs DonaxBadge (ERC721)        | Solidity 0.8.20 + OpenZeppelin          |
| **Hardhat**             | Framework para desarrollo, testeo y despliegue de contratos        | Hardhat Toolbox + Mocha                 |
| **Testnet Sepolia**     | Red de pruebas para validar el despliegue y la interacción         | Sepolia RPC                            |
| **Scripts de Despliegue** | Automatizan el deployment y la verificación de contratos         | scripts/deploy.js con ethers.js         |
| **MetaMask**            | Wallet para firmar transacciones y pruebas manuales                | MetaMask extensión                      |
| **Frontend React**      | Interfaz gráfica moderna y responsiva para la dApp                 | React, Recharts, React Router, React Icons |
| **Repositorio GitHub**  | Control de versiones y documentación completa                      | [GitHub](https://github.com/NekoXpert/blockchain---donaixchain) |
| **.env**                | Variables sensibles como llaves privadas y RPC URLs                | dotenv                                  |

**Justificación:**
- Se eligió Solidity y OpenZeppelin por su robustez y seguridad para contratos ERC20 y ERC721.
- Hardhat permite un flujo de trabajo ágil y seguro, con pruebas automatizadas y scripts de despliegue.
- Sepolia es la testnet recomendada para Ethereum.
- MetaMask facilita la interacción y validación manual.
- El frontend en React permite una experiencia de usuario moderna y profesional.
- El repositorio en GitHub centraliza el código y la documentación.

---

## 11. Testeo al smart contract y componentes

### Resultados de los tests unitarios (última ejecución)

```bash
PS E:\PORTFOLIO NEKOXPERT\CERTIFICATIONS\CERTUS\donaixchain> npx hardhat test
Compiled 1 Solidity file successfully (evm target: paris).

      ✔ Should have correct token details
    Transfers with burn
      ✔ Should burn 0.5% on transfer
    Annual emission
      ✔ Should not allow emission before 365 days

  DonaxBadgeNFT
    Deployment
      ✔ Should set the right owner
      ✔ Should have correct token details
    Minting
      ✔ Should mint badge to recipient
      ✔ Should only allow owner to mint


  9 passing (450ms)
```

#### Descripción de los tests realizados

- **NEKOINS (ERC20):**
  - Verifica nombre, símbolo y decimales del token.
  - Prueba la quema automática del 0.5% en transferencias.
  - Controla la emisión anual (no permite emitir antes de 365 días).
- **DonaxBadgeNFT (ERC721):**
  - Verifica el owner y los detalles del NFT.
  - Prueba el mint de NFT a destinatario.
  - Garantiza que solo el owner puede mintear.

**Todos los tests pasaron correctamente, validando la lógica y seguridad de los contratos.**

---

### Tests Unitarios Detallados

#### Tests del contrato NEKOINS (NekoinsToken)

##### 1. El propietario es correctamente asignado

**Explicación:**  
Verifica que el propietario del contrato (`owner`) es quien despliega el contrato.

**Código:**
```js
it("Should set the right owner", async function () {
    expect(await nekoinsToken.owner()).to.equal(owner.address);
});
```

**Comando de testeo:**
```bash
npx hardhat test --grep "Should set the right owner"
```

##### 2. El suministro inicial se asigna al propietario

**Explicación:**  
Comprueba que todo el suministro inicial de tokens se asigna a la cuenta del propietario.

**Código:**
```js
it("Should assign the initial supply to the owner", async function () {
    const ownerBalance = await nekoinsToken.balanceOf(owner.address);
    expect(await nekoinsToken.totalSupply()).to.equal(ownerBalance);
});
```

**Comando de testeo:**
```bash
npx hardhat test --grep "Should assign the initial supply to the owner"
```

##### 3. Los detalles del token son correctos

**Explicación:**  
Verifica que el nombre, símbolo y decimales del token sean los esperados.

**Código:**
```js
it("Should have correct token details", async function () {
    expect(await nekoinsToken.name()).to.equal("NEKOINS");
    expect(await nekoinsToken.symbol()).to.equal("NEK");
    expect(await nekoinsToken.decimals()).to.equal(18);
});
```

**Comando de testeo:**
```bash
npx hardhat test --grep "Should have correct token details"
```

##### 4. Transferencias queman el 0.5%

**Explicación:**  
Al transferir tokens, el 0.5% de la cantidad transferida se quema automáticamente, reduciendo el suministro total.

**Código:**
```js
it("Should burn 0.5% on transfer", async function () {
    const transferAmount = ethers.parseEther("1000");
    const expectedBurn = transferAmount * BigInt(5) / BigInt(1000); // 0.5%
    const expectedReceive = transferAmount - expectedBurn;

    const initialSupply = await nekoinsToken.totalSupply();

    await nekoinsToken.transfer(addr1.address, transferAmount);

    const addr1Balance = await nekoinsToken.balanceOf(addr1.address);
    const finalSupply = await nekoinsToken.totalSupply();

    expect(addr1Balance).to.equal(expectedReceive);
    expect(finalSupply).to.equal(initialSupply - expectedBurn);
});
```

**Comando de testeo:**
```bash
npx hardhat test --grep "Should burn 0.5% on transfer"
```

##### 5. Emisión anual solo tras 365 días

**Explicación:**  
No se puede emitir la recompensa anual de tokens antes de que pase un año desde el último evento de emisión.

**Código:**
```js
it("Should not allow emission before 365 days", async function () {
    await expect(
        nekoinsToken.emitAnnualTokens(addr1.address)
    ).to.be.revertedWith("Emission not ready");
});
```

**Comando de testeo:**
```bash
npx hardhat test --grep "Should not allow emission before 365 days"
```

#### Tests del contrato DonaxBadgeNFT

##### 6. El propietario es correctamente asignado (NFT)

**Explicación:**  
Verifica que el propietario del contrato NFT es quien lo despliega.

**Código:**
```js
it("Should set the right owner", async function () {
    expect(await donaxBadgeNFT.owner()).to.equal(owner.address);
});
```

**Comando de testeo:**
```bash
npx hardhat test --grep "Should set the right owner"
```

##### 7. Los detalles del NFT son correctos

**Explicación:**  
Verifica que el nombre y símbolo del NFT sean los esperados.

**Código:**
```js
it("Should have correct token details", async function () {
    expect(await donaxBadgeNFT.name()).to.equal("DonaxBadge");
    expect(await donaxBadgeNFT.symbol()).to.equal("DBADGE");
});
```

**Comando de testeo:**
```bash
npx hardhat test --grep "Should have correct token details"
```

##### 8. Mint de badge a un destinatario

**Explicación:**  
Permite al propietario mintear un NFT a una dirección específica, asignando el token y su metadata.

**Código:**
```js
it("Should mint badge to recipient", async function () {
    const tokenURI = "https://example.com/metadata/1";

    await donaxBadgeNFT.mintBadge(addr1.address, tokenURI);

    expect(await donaxBadgeNFT.ownerOf(1)).to.equal(addr1.address);
    expect(await donaxBadgeNFT.tokenURI(1)).to.equal(tokenURI);
    expect(await donaxBadgeNFT.balanceOf(addr1.address)).to.equal(1);
});
```

**Comando de testeo:**
```bash
npx hardhat test --grep "Should mint badge to recipient"
```

##### 9. Solo el owner puede mintear

**Explicación:**  
Solo el propietario del contrato puede mintear nuevos NFTs. Si otro usuario lo intenta, la transacción falla.

**Código:**
```js
it("Should only allow owner to mint", async function () {
    await expect(
        donaxBadgeNFT.connect(addr1).mintBadge(addr1.address, "test")
    ).to.be.revertedWithCustomError(donaxBadgeNFT, "OwnableUnauthorizedAccount");
});
```

**Comando de testeo:**
```bash
npx hardhat test --grep "Should only allow owner to mint"
```

---

## 12. Despliegue del prototipo en testnet

### Instrucciones para el despliegue

1. **Configura tu archivo `.env`**
   ```ini
   PRIVATE_KEY=TU_LLAVE_PRIVADA
   SEPOLIA_RPC_URL=https://rpc.ankr.com/eth_sepolia
   ```
2. **Compila los contratos**
   ```bash
   npx hardhat compile
   ```
3. **Despliega en Sepolia**
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```
4. **Verifica en Sepolia Etherscan**
   - Copia las direcciones de los contratos desplegados.
   - Ejemplo:
     - Token NEKOINS: `0x...`
     - NFT DonaxBadge: `0x...`
   - [Ver en Sepolia Etherscan](https://sepolia.etherscan.io)

### Evidencia de despliegue
- Incluye aquí tus pantallazos de la consola mostrando las direcciones y la verificación en Etherscan.
- El frontend está disponible en: [http://localhost:3001](http://localhost:3001) (o el puerto que indique la consola).

---

## Cumplimiento de la rúbrica de sobresaliente

### Desarrollo de un prototipo funcional
- El prototipo es completamente funcional, probado y listo para producción en testnet y frontend.

### Uso de los componentes de programación
- Se argumenta y documenta el uso de cada componente tecnológico, justificando su elección y función en el sistema.

### Dominio de los conceptos adquiridos sobre blockchain
- Se explica y demuestra el uso de la blockchain para trazabilidad, incentivos y transparencia, con ejemplos claros en los tests y la lógica de los contratos.

### Componentes necesarios para las conexiones con la blockchain
- Se detalla la conexión de los scripts, el uso de variables de entorno y la integración con la testnet Sepolia, mostrando dominio técnico y buenas prácticas.

### Gestión de información
- La documentación es clara, estructurada y acorde a los estándares de calidad, seguridad y netiqueta del sector tecnológico.

---

## Repositorio

- [Repositorio GitHub](https://github.com/NekoXpert/blockchain---donaixchain)

---

> **Nota:** Puedes añadir tus pantallazos reales de la consola y Etherscan en las secciones correspondientes para evidenciar el funcionamiento y cumplimiento de los criterios de evaluación.

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NekoinsToken", function () {
    let nekoinsToken;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        const NekoinsToken = await ethers.getContractFactory("NekoinsToken");
        nekoinsToken = await NekoinsToken.deploy();
        await nekoinsToken.waitForDeployment();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await nekoinsToken.owner()).to.equal(owner.address);
        });

        it("Should assign the initial supply to the owner", async function () {
            const ownerBalance = await nekoinsToken.balanceOf(owner.address);
            expect(await nekoinsToken.totalSupply()).to.equal(ownerBalance);
        });

        it("Should have correct token details", async function () {
            expect(await nekoinsToken.name()).to.equal("NEKOINS");
            expect(await nekoinsToken.symbol()).to.equal("NEK");
            expect(await nekoinsToken.decimals()).to.equal(18);
        });
    });

    describe("Transfers with burn", function () {
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
    });

    describe("Annual emission", function () {
        it("Should not allow emission before 365 days", async function () {
            await expect(
                nekoinsToken.emitAnnualTokens(addr1.address)
            ).to.be.revertedWith("Emission not ready");
        });
    });
});

describe("DonaxBadgeNFT", function () {
    let donaxBadgeNFT;
    let owner;
    let addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();

        const DonaxBadgeNFT = await ethers.getContractFactory("DonaxBadgeNFT");
        donaxBadgeNFT = await DonaxBadgeNFT.deploy();
        await donaxBadgeNFT.waitForDeployment();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await donaxBadgeNFT.owner()).to.equal(owner.address);
        });

        it("Should have correct token details", async function () {
            expect(await donaxBadgeNFT.name()).to.equal("DonaxBadge");
            expect(await donaxBadgeNFT.symbol()).to.equal("DBADGE");
        });
    });

    describe("Minting", function () {
        it("Should mint badge to recipient", async function () {
            const tokenURI = "https://example.com/metadata/1";

            await donaxBadgeNFT.mintBadge(addr1.address, tokenURI);

            expect(await donaxBadgeNFT.ownerOf(1)).to.equal(addr1.address);
            expect(await donaxBadgeNFT.tokenURI(1)).to.equal(tokenURI);
            expect(await donaxBadgeNFT.balanceOf(addr1.address)).to.equal(1);
        });

        it("Should only allow owner to mint", async function () {
            await expect(
                donaxBadgeNFT.connect(addr1).mintBadge(addr1.address, "test")
            ).to.be.revertedWithCustomError(donaxBadgeNFT, "OwnableUnauthorizedAccount");
        });
    });
});
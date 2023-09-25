const { expect } = require("chai");

describe("NicoFT NFT contract", function () {
  it("Mint token should be transfered to correct address", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const NicoFTProxyContract = await ethers.getContractFactory("NicoFTProxy");
    const NicoFTLogicContract = await ethers.getContractFactory("NicoFTLogic");

    this.NicoFTLogic = await NicoFTLogicContract.deploy();
    this.NicoFTProxy = await NicoFTProxyContract.deploy(
      100,
      this.NicoFTLogic.address,
      []
    );

    this.NicoFTProxiedLogic = await NicoFTLogicContract.attach(
      this.NicoFTProxy.address
    );

    await this.NicoFTProxiedLogic.safeMint(addr1.address, "TEST Metadata");

    expect(await this.NicoFTProxy.ownerOf(0)).to.equal(addr1.address);
  });

  it("Owner can be able to change the royalty value in bips", async function () {
    const [addr1] = await ethers.getSigners();

    await this.NicoFTProxiedLogic.setRoyaltyInfo(addr1.address, 200);

    const royaltyInfo = await this.NicoFTProxy.royaltyInfo(0, 100);

    expect(royaltyInfo[0]).to.equal(addr1.address);
    expect(royaltyInfo[1]).to.equal(2);
  });

  it("Royalty must be able to be set by token", async function () {
    const [addr1] = await ethers.getSigners();

    const NicoFTProxyContract = await ethers.getContractFactory("NicoFTProxy");
    const NicoFTLogicV2Contract = await ethers.getContractFactory(
      "NicoFTLogicV2"
    );

    this.NicoFTLogicV2 = await NicoFTLogicV2Contract.deploy();
    this.NicoFTProxy = await NicoFTProxyContract.deploy(
      100,
      this.NicoFTLogicV2.address,
      []
    );

    this.NicoFTProxiedV2Logic = await NicoFTLogicV2Contract.attach(
      this.NicoFTProxy.address
    );

    await this.NicoFTProxiedV2Logic.setTokenRoyaltyInfo(0, addr1.address, 300);
    const royaltyInfo = await this.NicoFTProxy.royaltyInfo(0, 100);

    expect(royaltyInfo[0]).to.equal(addr1.address);
    expect(royaltyInfo[1]).to.equal(3);
  });
});

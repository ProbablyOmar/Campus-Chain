// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const tokens = n => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  const [deployer] = await ethers.getSigners();

  // Deploy Dappazon
  const camp_cahin = await hre.ethers.getContractFactory("camp_chain");
  const campu_cahin = await camp_cahin.deploy();
  await campu_cahin.deployed();

  console.log(`Deployed camp_chain Contract at: ${campu_cahin.address}\n`);
}
//async function main() {
//  const [deployer] = await hre.ethers.getSigners();
//
//  console.log(
//    "Deploying contracts with the account:",
//    deployer.address
//  );
//
//  let txHash, txReceipt
//  const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
//  const nftMarket = await NFTMarket.deploy();
//  await nftMarket.deployed();
//
//  txHash = nftMarket.deployTransaction.hash;
//  txReceipt = await ethers.provider.waitForTransaction(txHash);
//  let nftMarketAddress = txReceipt.contractAddress
//
//  console.log("nftMarket deployed to:", nftMarketAddress);
//
//  const NFT = await hre.ethers.getContractFactory("NFT");
//  const nft = await NFT.deploy(nftMarketAddress);
//  await nft.deployed();
//
//
//  txHash = nft.deployTransaction.hash;
//  // console.log(`NFT hash: ${txHash}\nWaiting for transaction to be mined...`);
//  txReceipt = await ethers.provider.waitForTransaction(txHash);
//  let nftAddress = txReceipt.contractAddress
//
//  console.log("nft deployed to:", nftAddress);
//}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

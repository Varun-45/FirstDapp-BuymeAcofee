const hre = require("hardhat");
async function main() {
    const cof = await hre.ethers.getContractFactory("coffee") //smartcontractname
    const contract = await cof.deploy();
    await contract.waitForDeployment();
    console.log("Adress of contract:", contract.target)
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

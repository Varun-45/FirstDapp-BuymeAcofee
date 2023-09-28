// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
async function getBalance(adress) {
  const balanceBigint = await hre.ethers.provider.getBalance(adress);
  //console.log(balanceBigint)
  return hre.ethers.formatEther(balanceBigint);

}
async function consolebalances(adresses) {
  let counter = 0;
  for (const adress of adresses) {

    console.log(`Address ${counter} balance: `, await getBalance(adress))


    counter++;
  }
}
async function consoleMemos(memos) {
  for (const memo of memos) {
    const time = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;
    console.log(time, name, from, message)
  }
}
async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  //console.log(from3)
  const cof = await hre.ethers.getContractFactory("coffee") //smartcontractname
  const contract = await cof.deploy();
  //console.log(contract)
  //console.log(from1)

  await contract.waitForDeployment();
  console.log("Adress of contract:", contract.target)

  const adresses = [owner.address, from1.address, from2.address, from3.address]
  console.log("b4 buying:");
  // console.log("from1", contract.address)
  await consolebalances(adresses)

  const amount = { value: hre.ethers.parseEther("1") }
  await contract.connect(from1).buymecoffee("from1", "Nice work", amount)
  await contract.connect(from2).buymecoffee("from2", "Nice work", amount)
  await contract.connect(from3).buymecoffee("from3", "Nice work", amount)
  console.log("after buying:");
  await consolebalances(adresses)
  const memos = await contract.getMemos();
  consoleMemos(memos);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

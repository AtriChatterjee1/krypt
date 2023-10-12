const main = async () => {
  const transactionsFactory = await hre.ethers.getContractFactory("Transactions");
  const transactionsContract = await transactionsFactory.deploy();

  await transactionsContract.deployed();

  console.log("Transactions address: ", transactionsContract.address);
};


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const runMain = async () => {
  try {
    await main() ;
    process.exit(0);

  }catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain()

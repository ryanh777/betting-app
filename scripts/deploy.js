async function main() {  
    const House = await ethers.getContractFactory("House");
    const house = await House.deploy();

    console.log("House address:", house.address);
  
    // const Bet = await ethers.getContractFactory("Bet");
    // const bet = await Bet.deploy("test", '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 1000000000000000);

    // console.log("Bet address:", bet.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
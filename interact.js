const { ethers } = require("ethers");
const contractAbi = require("./build/LimeToken.json");

(async () => {
    const PRIVATE_KEY = "0x7ab741b57e8d94dd7e1a29055646bafde7010f38a900f55bbd7647880faa6ee8";
    const CONTACT_ADDRESS = "0xa6DD34f3CeA10D1F78c0b1F8C13eFbAbE5DF9708";

    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(CONTACT_ADDRESS, contractAbi.abi, wallet);

    const DEPLOYER_ADDRESS = "0xd9995bae12fee327256ffec1e3184d492bd94c31";
    const currencySymbol = await contract.symbol();
    
    let currentBalance, currentReceiverBalance;

    currentBalance = await contract.balanceOf(DEPLOYER_ADDRESS);
    console.log("Deployer balance: ", ethers.utils.formatEther(currentBalance), currencySymbol);

    // Mint tokens
    const mintTokens = "2";
    const parsedTokensToMint = ethers.utils.parseEther(mintTokens);
    await contract.mint(DEPLOYER_ADDRESS, parsedTokensToMint);
    console.log(`Tokens minted: ${mintTokens} ${currencySymbol}`);

    currentBalance = await contract.balanceOf(DEPLOYER_ADDRESS);
    console.log("Deployer balance: ", ethers.utils.formatEther(currentBalance), currencySymbol);

    // Transfer tokens
    const TRANSFER_ADDRESS = "0x465b2b6CC578268BA33f24A7e151D144b0E44D29";
    
    const transferTokens = "1.43";
    const parsedTokensToTransfer = ethers.utils.parseEther(transferTokens);
    
    await contract.transfer(TRANSFER_ADDRESS, parsedTokensToTransfer);
    console.log(`Transferred: ${transferTokens} ${currencySymbol}`);

    // Current balance
    currentBalance = await contract.balanceOf(DEPLOYER_ADDRESS);
    console.log("Deployer balance: ", ethers.utils.formatEther(currentBalance), currencySymbol);

    // Receiver balance
    currentReceiverBalance = await contract.balanceOf(TRANSFER_ADDRESS);
    console.log("Receiver balance: ", ethers.utils.formatEther(currentReceiverBalance), currencySymbol);

    // Burn deployer remaining tokens
    await contract.burn(currentBalance);
    console.log("Burned amount: ", ethers.utils.formatEther(currentReceiverBalance), currencySymbol);

    currentBalance = await contract.balanceOf(DEPLOYER_ADDRESS);
    console.log("Deployer balance: ", ethers.utils.formatEther(currentBalance), currencySymbol);
})();
import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./constants.js";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const balanceButton = document.getElementById("balanceButton");
const withdrawButton = document.getElementById("withdrawButton");
connectButton.onclick = connect;
fundButton.onclick = fund;
balanceButton.onclick = getBalance;
withdrawButton.onclick = withdraw;

let walletAddress = document.getElementById("walletAddress");
let balanceAmountDiv = document.getElementById("balanceAmountDiv");
let withdrawDiv = document.getElementById("withdrawDiv");

console.log(ethers);

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);
    connectButton.innerHTML = accounts;
  } else {
    connectButton.innerHTML = "Please install MetaMask";
    alert("Wallet was not successfully connected");
  }
}

async function getBalance() {
  let balanceAmount = document.getElementById("balanceAmount");
  let bal;
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(contractAddress);
    bal = ethers.utils.formatEther(balance);
    console.log(bal);
    balanceAmountDiv.value = `${bal} ETH`;
  }
}

//creates a promise that listens for the transaction to go through
function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}...`);
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log(
        `Completed with ${transactionReceipt.confirmations} confirmations`
      );
      resolve();
    });
  });
}

async function fund() {
  const ethAmount = document.getElementById("ethAmount").value;
  console.log(`Funding with ${ethAmount} ETH...`);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });
      await listenForTransactionMine(transactionResponse, provider);
      console.log("Done");
      document.getElementById(
        "successMessage"
      ).innerHTML = `${ethAmount} ETH Deposited Successfully`;
    } catch (error) {
      console.log(error);
    }
  }
}

async function withdraw() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(contractAddress);
    let bal = ethers.utils.formatEther(balance);
    console.log(`Withdrawing ${bal} ETH...`);
    withdrawDiv.value = `${bal} ETH`;
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.withdraw();
      await listenForTransactionMine(transactionResponse, provider);
      console.log("Funds withdrawn successfully");
      document.getElementById(
        "successMessage"
      ).innerHTML = `${bal} ETH Withdrawn Successfully`;
    } catch (error) {
      console.log(error);
    }
  }
}

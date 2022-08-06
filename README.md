# Localhost Funding Application

This project focuses on testing the front-end capabilities of the hardhat network and interacting with Metamask in a browser setting using a local host network. It utilizes a hardhat node as a means of creating a local blockchain in order to interact with the 'FundMe' contract. The address of the contract is located in 'constants.js :1'.

![image](https://user-images.githubusercontent.com/99213972/183232560-a172af91-df8e-435e-a6e5-4616665d8750.png)

The program incorporates these functions:
<br>
connect() - connects the Metamask wallet to the program
<br>
getBalance() - retrieves the current balance of the contract
<br>
listenForTransactionMine () - acts as a confirmation for funding/depositing into the contract
<br>
fund() - adds funds into the contract
<br>
withdraw() - withdraws the full balance of the contract

# WARNING

This program is strictly for testing purposes. It does not work with testnet/mainnet networks because all of the data required for this contract is hard coded. Any real/testnet funds deposited into the contract will be lost.

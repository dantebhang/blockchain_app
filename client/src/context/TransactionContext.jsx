import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

//fetch ethereum contract
const getEthereumContract = () => {
	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = provider.getSigner();
	const transactionContract = new ethers.Contract(
		contractAddress,
		contractABI,
		signer,
	);

	return transactionContract;
};

//context provider
export const TransactionProvider = ({ children }) => {
	const [connectedAccount, setConnectedAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false)
	const [formData, setFormData] = useState({
		addressTo: "",
		amount: "",
		keyword: "",
		message: "",
	});
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));

	const handleChange = (e, name) => {
		setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
	};

	const checkIfWalletIsConnected = async () => {
		try {
			if (!ethereum) return alert("Please install Metamask");

			const accounts = await ethereum.request({ method: "eth_accounts" });

			if (accounts.length) {
				setConnectedAccount(accounts[0]);

				//getAllTransactions();
			} else {
				console.log("No accounts found");
			}
		} catch (error) {
			console.log(error);

			throw new Error("No ethereum object.");
		}
	};

	const connectWallet = async () => {
		try {
			if (!ethereum) return alert("Please install MetaMask");

			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});

			setConnectedAccount(accounts[0]);
		} catch (error) {
			console.log(error);

			throw new Error("No ethereum object.");
		}
	};

	const sendTransaction = async () => {
		try {
			if (!ethereum) return alert("Please install MetaMask");

			//get the data from the form
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({ 
        method: 'eth_sendTransaction', 
        params: [{
          from: connectedAccount, 
          to: addressTo, 
          gas: "0x5208", //21000 GWEI
          value: parsedAmount._hex, //0.00001
        }]
      });

      const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`)
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`)

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());

		} catch (error) {
			console.log(error);

			throw new Error("No ethereum object.");
		}
	};

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	return (
		<TransactionContext.Provider value={{ connectWallet, connectedAccount, formData, handleChange, sendTransaction }}>
			{children}
		</TransactionContext.Provider>
	);
};

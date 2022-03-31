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

	console.log({
		provider,
		signer,
		transactionContract,
	});
};

//context provider
export const TransactionProvider = ({ children }) => {
	const [connectedAccount, setConnectedAccount] = useState("");
	const [formData, setFormData] = useState({
		addressTo: "",
		amount: "",
		keyword: "",
		message: "",
	});

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
		} catch (error) {
			console.log(error);

			throw new Error("No ethereum object.");
		}
	};

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	return (
		<TransactionContext.Provider value={{ connectWallet, connectedAccount }}>
			{children}
		</TransactionContext.Provider>
	);
};

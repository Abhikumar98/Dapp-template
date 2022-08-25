

import {ethers} from "ethers";
import abi from "./abi.json";

export const contract = () => {
    const { ethereum } = window;
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	if (ethereum) {
		const signer = provider.getSigner();
		const contractReader = new ethers.Contract(
			"0x5fbdb2315678afecb367f032d93f642f64180aa3",
			abi,
			signer
		);
		return contractReader;
	}
};


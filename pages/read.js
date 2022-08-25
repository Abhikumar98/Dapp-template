import { ethers } from "ethers";
import React, { useEffect } from "react";
import { contract } from "../utils/ethereum";
import Transactor from "../utils/funds";
import useStaticJsonRPC from "../utils/useStaticJsonRPC";

const localRpcUrl = process.env.REACT_APP_CODESPACES
	? `https://${window.location.hostname.replace("3000", "8545")}`
	: "http://" +
	  (global.window ? window.location.hostname : "localhost") +
	  ":8545";

const Read = () => {
	const localProvider = useStaticJsonRPC([localRpcUrl]);

	console.log({ localProvider });

	const readState = async () => {
		console.log("reading state");
		const reader = await contract().purpose();
		console.log(reader);
	};

	const writeState = async () => {
		const random = Math.random().toString();
		const reader = await contract().setPurpose(random);
		await reader.wait();

		await readState();
	};

	useEffect(() => {
		readState();
	}, []);

	const faucetTx = Transactor(localProvider);

	return (
		<>
			<div onClick={writeState}>Read</div>
			<button
				onClick={() => {
					console.log("hello");
					faucetTx({
						to: "0xAD6561E9e306C923512B4ea7af902994BEbd99B8",
						value: ethers.utils.parseEther("1"),
					});
				}}
			>
				Funds plis
			</button>
		</>
	);
};

export default Read;

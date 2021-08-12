import React from 'react';
import Card from 'components/Card';
import styled, { useTheme } from 'styled-components';
import Row from 'components/Row';
import Button from 'components/Button';
import { Typography } from 'theme';
import cEthRinkeby from '../../utils/abi.json';
import { useGlobalStore } from '../../store/index';
import Web3 from 'web3';

export function SupplyButton({ text }) {
	const [store, { updateStore }] = useGlobalStore();

	async function useSupply() {
		const key = 'walletAddress';

		const web3 = new Web3(Web3.givenProvider);
		const cEthAddress = '0xd6801a1dffcd0a410336ef88def4320d6df1883e';

		const compoundCEthContract = new web3.eth.Contract(cEthRinkeby, cEthAddress);

		console.log('boutta supply cETH...');

		await compoundCEthContract.methods.mint().send({
			from: store[key],
			gasLimit: web3.utils.toHex(1500000),
			gasPrice: web3.utils.toHex(20000000000),
			value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
		});

		alert('Supplied ETH!');
	}

	const theme = useTheme();
	return (
		<Button onClick={useSupply}>
			<Card height="48px" width="" padding={theme.spacing.sm}>
				<Row justify="space-between">
					<Typography.header>{text}</Typography.header>
				</Row>
			</Card>
		</Button>
	);
}

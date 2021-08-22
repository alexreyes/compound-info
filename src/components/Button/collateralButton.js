import React from 'react';
import Card from 'components/Card';
import styled, { useTheme } from 'styled-components';
import Row from 'components/Row';
import Button from 'components/Button';
import { Typography } from 'theme';
import { useGlobalStore } from '../../store/index';
import Web3 from 'web3';

export function CollateralButton() {
	const [store, { updateStore }] = useGlobalStore();
	const key = 'walletAddress';
	const web3 = new Web3(Web3.givenProvider);

	async function useCollateral() {
		// const cEthAddress = '0xd6801a1dffcd0a410336ef88def4320d6df1883e';
		// const comptrollerAddress = '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b';
		// const comptrollerContract = new web3.eth.Contract(rinkebyComptroller, comptrollerAddress);

		// const fromMyWallet = {
		// 	from: store[key],
		// 	gasLimit: web3.utils.toHex(500000),
		// 	gasPrice: web3.utils.toHex(20000000000),
		// };

		// let markets = [cEthAddress];
		// await comptrollerContract.methods.enterMarkets(markets).send(fromMyWallet);

		alert('TODO');
	}

	const theme = useTheme();
	return (
		<Button onClick={useCollateral}>
			<Card height="48px" width="" padding={theme.spacing.sm}>
				<Row justify="space-between">
					<Typography.header>Enable collateral</Typography.header>
				</Row>
			</Card>
		</Button>
	);
}

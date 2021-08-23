import React from 'react';
import Card from 'components/Card';
import styled, { useTheme } from 'styled-components';
import Row from 'components/Row';
import Button from 'components/Button';
import { Typography } from 'theme';
import Compound from '@compound-finance/compound-js';

export function SupplyButton({ coin }) {
	const compound = new Compound(window.ethereum);
	console.log(coin);

	async function useSupply() {
		console.log('Supplying ' + coin + ' to the Compound Protocol...');
		const transaction = await compound.supply(coin, 0.01);
		console.log('Transaction object: ', transaction);
	}

	const theme = useTheme();
	return (
		<Button onClick={useSupply}>
			<Card height="48px" width="" padding={theme.spacing.sm}>
				<Row justify="space-between">
					<Typography.header>Supply</Typography.header>
				</Row>
			</Card>
		</Button>
	);
}

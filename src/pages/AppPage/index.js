import React, { useEffect, useState } from 'react';
import { ResponsiveRow } from 'components/Row';
import { useTheme } from 'styled-components';
import { Typography } from 'theme';
import { SupplyCard, BorrowCard } from 'components/Card';
import { useGlobalStore } from '../../store/index';
import Compound from '@compound-finance/compound-js';
import { cTokenMappings } from 'utils';

export default function AppPage() {
	const theme = useTheme();
	const gap = theme.spacing.md;

	var compound = new Compound(window.ethereum);
	const [store, { updateStore }] = useGlobalStore();
	const [totalValue, setTotalValue] = useState(0);
	const [userTokens, setUserTokens] = useState(0);

	async function getUserInfo() {
		const key = 'walletAddress';
		const account = await Compound.api.account({
			addresses: store[key],
			network: 'mainnet',
		});

		// var tokensList = account.accounts[0].tokens;

		if (account.accounts[0]) {
			console.log(account.accounts[0]);

			let result = await getArray(account.accounts[0].tokens);
			setUserTokens(result);
			console.log('ye');
			let total = getTotal(result);
			setTotalValue(total);
		}
	}

	async function getArray(arr) {
		let coins = [];

		for (var token of arr) {
			if (token.supply_balance_underlying.value > 0) {
				let name = cTokenMappings[token.symbol];
				let price = await compound.getPrice(name);
				let balance = token.supply_balance_underlying.value * price;
				let coin = {
					name: name,
					symbol: token.symbol,
					amount: token.supply_balance_underlying.value,
					price: price,
					balance: balance,
				};
				coins.push(coin);
			}
		}
		return coins;
	}

	function getTotal(coinList) {
		var total = 0;
		coinList.forEach((coin) => {
			total += coin.price * coin.amount;
		});
		return total.toFixed(2);
	}

	useEffect(() => {
		getUserInfo();
	}, [totalValue]);

	return (
		<>
			<Typography.displayS>Supply balance: </Typography.displayS>
			<Typography.displayXL>${totalValue}</Typography.displayXL>

			<p>supply and borrow crypto here!</p>
			<ResponsiveRow gap={gap}>
				<SupplyCard title={'Supply'} userTokens={userTokens} tooltipContent="Supply tokens on Compound" />
				<BorrowCard title={'Borrow'} tooltipContent="Borrow tokens on Compound" value="USDC" />
			</ResponsiveRow>
		</>
	);
}

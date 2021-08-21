import React, { useEffect } from 'react';
import { ResponsiveRow } from 'components/Row';
import { useTheme } from 'styled-components';
import { SupplyCard, BorrowCard } from 'components/Card';
import { useGlobalStore } from '../../store/index';
import Compound from '@compound-finance/compound-js';
import { cTokenMappings } from 'utils';

export default function AppPage() {
	const theme = useTheme();
	const gap = theme.spacing.md;

	var compound = new Compound(window.ethereum);
	const [store, { updateStore }] = useGlobalStore();
	const key = 'walletAddress';
	var coins = [];

	async function getUserInfo() {
		const account = await Compound.api.account({
			addresses: store[key],
			network: 'mainnet',
		});

		Promise.all(
			account.accounts[0].tokens.map(async (token) => {
				if (token.supply_balance_underlying.value > 0) {
					let name = cTokenMappings[token.symbol];
					let price = await compound.getPrice(name);
					let coin = {
						name: name,
						symbol: token.symbol,
						amount: token.supply_balance_underlying.value,
						price: price,
					};
					coins.push(coin);
				}
			})
		).then(() => {
			console.log(coins);
		});
	}

	function getTotal(coinList) {
		var total = 0;

		coinList.map((coin) => {
			total += coin.price * coin.amount;
		});
		return total.toFixed(2);
	}

	useEffect(() => {
		console.log(getUserInfo());
	});

	return (
		<>
			<p>supply and borrow crypto here!</p>
			<ResponsiveRow gap={gap}>
				<SupplyCard title={'Supply'} tooltipContent="Supply tokens on Compound" value="ETH" unit="$" />
				<BorrowCard title={'Borrow'} tooltipContent="Borrow tokens on Compound" value="USDC" />
			</ResponsiveRow>
		</>
	);
}

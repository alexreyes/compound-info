import React from 'react';
import { ResponsiveRow } from 'components/Row';
import { useTheme } from 'styled-components';
import { SupplyCard, BorrowCard } from 'components/Card';

export default function AppPage() {
	const theme = useTheme();
	const gap = theme.spacing.md;
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

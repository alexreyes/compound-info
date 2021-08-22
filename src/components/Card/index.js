import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typography } from 'theme';
import { formatNumber } from 'utils';
import ProgressRing from 'components/ProgressRing';
import Row, { ResponsiveRow, ResponsiveJustifyRow } from 'components/Row';
import Column from 'components/Column';
import TooltipText from 'components/TooltipText';
import { DefaultButton } from 'components/Button/defaultButton';
import { SupplyButton } from 'components/Button/supplyButton';
import { useGlobalStore } from '../../store/index';
import { CollateralButton } from 'components/Button/collateralButton';
import { StyledExternalInfoLink } from 'theme/components';

const Card = styled.div`
	display: flex;
	flex-direction: ${({ column }) => (column ? 'column' : 'row')};
	border-radius: ${({ theme }) => theme.radius.lg};
	background-color: ${({ theme }) => theme.color.bg1};
	height: ${({ height }) => height ?? '100%'};
	width: ${({ width }) => width ?? '100%'};
	padding: ${({ padding, theme }) => padding ?? theme.spacing.lg};
	margin: 0;
	box-shadow: ${({ theme }) => theme.shadow.card};
	row-gap: 8px;

	${({ theme }) => theme.mediaWidth.small`
		padding: ${({ theme }) => theme.spacing.md};
	`}
`;

export default Card;

const StyledStatCard = styled(Card)`
	flex-direction: column;
	justify-content: flex-start;
`;

const CardHeader = styled(Typography.header)`
	color: ${({ theme }) => theme.color.bg4};
`;

export function StatCard({ title, value, unit, tooltipContent }) {
	const formattedValue = formatNumber(value, unit);
	return (
		<StyledStatCard>
			<Row>
				<TooltipText baseText={<CardHeader>{title}</CardHeader>} tooltipContent={tooltipContent} />
			</Row>
			<Row>
				<Typography.displayL>{formattedValue}</Typography.displayL>
			</Row>
		</StyledStatCard>
	);
}

const click = () => {
	alert('TODO');
};

export function SupplyCard({ title, userTokens, tooltipContent }) {
	return (
		<>
			{userTokens && (
				<StyledStatCard>
					<Row>
						<TooltipText baseText={<CardHeader>{title}</CardHeader>} tooltipContent={tooltipContent} />
					</Row>
					{userTokens.map((token) => (
						<Row key={token.name}>
							<Typography.displayM>{token.name}</Typography.displayM>
							<p>Balance: ${token.balance.toFixed(2)}</p>
							<div style={{ float: 'right' }}>
								<SupplyButton coin={token.name}></SupplyButton>
								<CollateralButton></CollateralButton>
							</div>
						</Row>
					))}
				</StyledStatCard>
			)}
		</>
	);
}

export function BorrowCard({ title, value, unit, tooltipContent }) {
	const formattedValue = formatNumber(value, unit);
	return (
		<StyledStatCard>
			<Row>
				<TooltipText baseText={<CardHeader>{title}</CardHeader>} tooltipContent={tooltipContent} />
			</Row>
			<Row>
				<Typography.displayM>{formattedValue}</Typography.displayM>
				<DefaultButton customOnClick={click} text="Borrow"></DefaultButton>
			</Row>
		</StyledStatCard>
	);
}

export function CoinInfoCard({ value, whitepaper, website, twitter, coingecko }) {
	return (
		<StyledStatCard>
			<Row>
				<Typography.body>{value}</Typography.body>
			</Row>
			<br />
			<ResponsiveRow align="flex-start" xs>
				<StyledExternalInfoLink href={whitepaper} content={'Whitepaper ↗'} />
				<StyledExternalInfoLink href={website} content={'Website ↗'} />
				<StyledExternalInfoLink href={twitter} content={'Twitter ↗'} />
				<StyledExternalInfoLink href={coingecko} content={'Coingecko ↗'} />
			</ResponsiveRow>
		</StyledStatCard>
	);
}

// progressValue is a number from 0 to 1
export function ProgressCard({ title, value, unit, size, progressValue, tooltipContent }) {
	const formattedValue = formatNumber(value, unit);
	return (
		<Card>
			<Column align="left">
				<Row>
					<TooltipText baseText={<CardHeader>{title}</CardHeader>} tooltipContent={tooltipContent} />
				</Row>
				<Typography.displayL>{formattedValue}</Typography.displayL>
			</Column>
			<ProgressRing value={progressValue ?? value} size={size} />
		</Card>
	);
}

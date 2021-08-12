import React from 'react';
import Card from 'components/Card';
import styled, { useTheme } from 'styled-components';
import Row from 'components/Row';
import Button from 'components/Button';
import { Typography } from 'theme';

export function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
	const theme = useTheme();
	return (
		<Button
			onClick={() => {
				if (!provider) {
					loadWeb3Modal();
				} else {
					logoutOfWeb3Modal();
				}
			}}
		>
			<Card height="48px" width="" padding={theme.spacing.sm}>
				<Row justify="space-between">
					<Typography.header>{!provider ? 'Connect Wallet' : 'Disconnect Wallet'}</Typography.header>
				</Row>
			</Card>
		</Button>
	);
}

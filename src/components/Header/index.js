import React from 'react';
import styled, { useTheme } from 'styled-components';
import { StyledLogo, StyledExternalLink, StyledInternalLink } from 'theme/components';
import headerLogo from 'assets/headerLogo.svg';
import Row from 'components/Row';
import GasTracker from 'components/GasTracker';
import { URLS } from 'constants/index';
import { Link } from 'react-router-dom';
import { Typography } from 'theme';
import { HideSmall } from 'theme/components';
import { IconButton } from 'components/Button/iconButton';
import Button from 'components/Button';
import { WalletButton } from 'components/Button/walletButton';
import useWeb3Modal from 'store/useWeb3Modal';
import Web3 from 'web3';
import { useEffect, useState } from 'react';
import { useGlobalStore } from '../../store/index';

// 'BF' on the background color uses RRGGBBAA, giving 75% alpha on the background color
const StyledHeader = styled.div`
	display: flex;
	height: 72px;
	width: 100%;
	background-color: ${({ theme }) => theme.color.bg0};
	align-items: center;
`;

export default function Header() {
	const theme = useTheme();
	const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
	const [store, { updateStore }] = useGlobalStore();
	const key = 'walletAddress';

	console.log(store[key]);

	const web3 = new Web3(Web3.givenProvider);
	useEffect(() => {
		async function loadBlockchainData() {
			const accounts = await web3.eth.getAccounts();
			updateStore(key, accounts[0]);
		}
		loadBlockchainData();
	}, []);

	return (
		<StyledHeader>
			<Row padding={'0 ' + theme.spacing.lg} justify="space-between">
				<Row>
					<StyledInternalLink to="/">
						<Typography.displayL>Compound Finance</Typography.displayL>
					</StyledInternalLink>
				</Row>
				<HideSmall>
					<Row>
						<StyledInternalLink to="/overview">
							<Typography.displayS>Markets</Typography.displayS>
						</StyledInternalLink>
						<break></break>
						<a href="https://comp.vote/" rel="noopener noreferrer" target="_blank">
							<Typography.displayS>Governance</Typography.displayS>
						</a>
						<IconButton />
						<GasTracker />
						<WalletButton
							provider={provider}
							loadWeb3Modal={loadWeb3Modal}
							logoutOfWeb3Modal={logoutOfWeb3Modal}
						></WalletButton>
					</Row>
				</HideSmall>
			</Row>
		</StyledHeader>
	);
}

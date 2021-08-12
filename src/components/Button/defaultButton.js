import React from 'react';
import Card from 'components/Card';
import styled, { useTheme } from 'styled-components';
import Row from 'components/Row';
import Button from 'components/Button';
import { Typography } from 'theme';

export function DefaultButton({ customOnClick, text }) {
	const theme = useTheme();
	return (
		<Button onClick={customOnClick}>
			<Card height="48px" width="" padding={theme.spacing.sm}>
				<Row justify="space-between">
					<Typography.header>{text}</Typography.header>
				</Row>
			</Card>
		</Button>
	);
}

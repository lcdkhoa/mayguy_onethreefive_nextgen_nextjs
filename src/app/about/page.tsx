'use client';

import ButtonWithLink from '@/components/Buttons/ButtonWithLink';
import { GitHub, LinkedIn } from '@mui/icons-material';
import { Box, Container, Typography } from '@mui/material';

import {
	ABOUT_ME_FIFTH,
	ABOUT_ME_FIRST,
	ABOUT_ME_FOURTH,
	ABOUT_ME_SECOND_LINK_TEXT,
	ABOUT_ME_SECOND_PREFIX,
	ABOUT_ME_SECOND_SUFFIX,
	ABOUT_ME_SIXTH,
	ABOUT_ME_THIRD,
	ABOUT_SPACE,
	GITHUB_URL,
	LINKEDIN_URL,
} from './configs/constants';

export default function About() {
	return (
		<Container maxWidth="lg">
			<Box sx={{ my: 4 }}>
				<Typography variant="h3" gutterBottom>
					{ABOUT_SPACE}
				</Typography>
				<Typography variant="body1">{ABOUT_ME_FIRST}</Typography>
				<Typography variant="body1">
					{ABOUT_ME_SECOND_PREFIX}{' '}
					<a
						href="https://360f.com"
						target="_blank"
						style={{
							color: 'red',
							textDecoration: 'none',
							fontWeight: 'normal',
						}}
					>
						{ABOUT_ME_SECOND_LINK_TEXT}
					</a>{' '}
					{ABOUT_ME_SECOND_SUFFIX}
				</Typography>
				<br />
				<Typography variant="body1">{ABOUT_ME_THIRD}</Typography>
				<Typography variant="body1">{ABOUT_ME_FOURTH}</Typography>
				<br />
				<Typography variant="body1">{ABOUT_ME_FIFTH}</Typography>
				<br />

				<span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
					<Typography variant="body1">{ABOUT_ME_SIXTH}</Typography>
					<ButtonWithLink url={GITHUB_URL}>
						<GitHub color="primary" fontSize="small" />
					</ButtonWithLink>
					<ButtonWithLink url={LINKEDIN_URL}>
						<LinkedIn color="primary" fontSize="small" />
					</ButtonWithLink>
				</span>
			</Box>
		</Container>
	);
}

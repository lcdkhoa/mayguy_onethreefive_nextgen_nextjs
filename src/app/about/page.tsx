'use client';

import ButtonWithLink from '@/components/Buttons/ButtonWithLink';
import { Coffee, Email, GitHub, LinkedIn } from '@mui/icons-material';
import { Avatar, Grid, Typography } from '@mui/material';
import Image from 'next/image';

import {
	ABOUT_ME_FIFTH,
	ABOUT_ME_FIRST,
	ABOUT_ME_FIRST_CALL_ME,
	ABOUT_ME_FOURTH,
	ABOUT_ME_SECOND_LINK_TEXT,
	ABOUT_ME_SECOND_PREFIX,
	ABOUT_ME_SECOND_SUFFIX,
	ABOUT_ME_SIXTH,
	ABOUT_ME_THIRD,
	BUY_ME_A_COFFEE_URL,
	BUY_ME_COFFEE_TEXT,
	EMAIL_URL,
	GITHUB_URL,
	LINKEDIN_URL,
} from './configs/constants';

export default function About() {
	return (
		<Grid
			justifyContent={'center'}
			alignContent={'center'}
			sx={{ overflow: 'hidden', display: 'flex', flexDirection: 'row' }}
			mt={10}
		>
			<Grid>
				<Grid container>
					<Grid size={3} justifyItems={'center'} alignItems={'center'}>
						<Avatar
							sx={{
								width: { xs: 120, sm: 140, md: 160 },
								height: { xs: 120, sm: 140, md: 160 },
								border: '3px solid',
								borderColor: 'primary.main',
								boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
								transition: 'all 0.3s ease-in-out',
								flexShrink: 0,
							}}
						>
							<Image
								src="/images/about/avatar.png"
								alt="Dang Khoa (Charlie) - Full-stack Developer"
								width={180}
								height={180}
								style={{
									width: '100%',
									height: '100%',
									objectFit: 'cover',
								}}
							/>
						</Avatar>
					</Grid>

					<Grid size={9} alignItems={'center'} alignContent={'center'}>
						<Typography variant="h3">{ABOUT_ME_FIRST}</Typography>
						<Typography variant="h4">{ABOUT_ME_FIRST_CALL_ME}</Typography>
					</Grid>
				</Grid>
				<Typography variant="body1" mt={2}>
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
					<ButtonWithLink url={EMAIL_URL}>
						<Email color="primary" fontSize="small" />
					</ButtonWithLink>
				</span>

				<span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
					<Typography variant="body1">{BUY_ME_COFFEE_TEXT}</Typography>
					<ButtonWithLink url={BUY_ME_A_COFFEE_URL}>
						<Coffee color="primary" fontSize="small" />
					</ButtonWithLink>
				</span>
			</Grid>
		</Grid>
	);
}

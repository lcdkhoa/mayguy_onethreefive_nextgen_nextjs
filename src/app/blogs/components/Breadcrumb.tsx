'use client';

import { Box, Breadcrumbs, Link as MuiLink, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumb() {
	const pathname = usePathname();
	const paths = pathname.split('/').filter(Boolean);

	return (
		<Box sx={{ mb: 3 }}>
			<Breadcrumbs aria-label="breadcrumb">
				<MuiLink href="/" color="inherit" component={Link}>
					Trang chủ
				</MuiLink>
				{paths.map((path, index) => {
					const href = `/${paths.slice(0, index + 1).join('/')}`;
					const isLast = index === paths.length - 1;

					return isLast ? (
						<Typography key={path} color="text.primary">
							{path.charAt(0).toUpperCase() + path.slice(1)}
						</Typography>
					) : (
						<MuiLink key={path} href={href} color="inherit" component={Link}>
							{path.charAt(0).toUpperCase() + path.slice(1)}
						</MuiLink>
					);
				})}
			</Breadcrumbs>
		</Box>
	);
}

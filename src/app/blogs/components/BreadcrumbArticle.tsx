'use client';

import { Box, Breadcrumbs, Link as MuiLink, Typography } from '@mui/material';
import { format } from 'date-fns';
import Link from 'next/link';

interface BreadcrumbArticleProps {
	category: string;
	date: string;
	title: string;
	slug: string;
}

export default function BreadcrumbArticle({ category, date, title, slug }: BreadcrumbArticleProps) {
	const year = date ? format(new Date(date), 'yyyy') : '';
	const month = date ? format(new Date(date), 'MM') : '';

	return (
		<Box sx={{ mb: 2 }}>
			<Breadcrumbs aria-label="breadcrumb">
				<MuiLink href="/blogs" color="inherit" component={Link}>
					Blog
				</MuiLink>
				<MuiLink href={`/blogs?category=${category}`} color="inherit" component={Link}>
					{category}
				</MuiLink>
				{year && (
					<MuiLink href={`/blogs?year=${year}`} color="inherit" component={Link}>
						{year}
					</MuiLink>
				)}
				{month && (
					<MuiLink href={`/blogs?year=${year}&month=${month}`} color="inherit" component={Link}>
						{month}
					</MuiLink>
				)}
				<Typography color="text.primary">{title}</Typography>
			</Breadcrumbs>
		</Box>
	);
}

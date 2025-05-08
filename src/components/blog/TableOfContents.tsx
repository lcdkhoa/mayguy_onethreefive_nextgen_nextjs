'use client';

import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface TableOfContentsProps {
	content: string;
}

interface TocItem {
	id: string;
	text: string;
	level: number;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
	const [toc, setToc] = useState<TocItem[]>([]);

	useEffect(() => {
		const headings = content.match(/^#{1,3}\s.+$/gm) || [];
		const items = headings.map((heading) => {
			const level = heading.match(/^#+/)?.[0].length || 1;
			const text = heading.replace(/^#+\s/, '');
			const id = text.toLowerCase().replace(/\s+/g, '-');

			return { id, text, level };
		});

		setToc(items);
	}, [content]);

	if (toc.length === 0) return null;

	return (
		<Paper elevation={0} sx={{ p: 2, position: 'sticky', top: 100 }}>
			<Typography variant="h6" gutterBottom>
				Mục lục
			</Typography>
			<List dense>
				{toc.map((item) => (
					<ListItem
						key={item.id}
						component="a"
						href={`#${item.id}`}
						sx={{
							pl: (item.level - 1) * 2,
							color: 'text.secondary',
							textDecoration: 'none',
							'&:hover': {
								color: 'primary.main',
							},
						}}
					>
						<ListItemText primary={item.text} />
					</ListItem>
				))}
			</List>
		</Paper>
	);
}

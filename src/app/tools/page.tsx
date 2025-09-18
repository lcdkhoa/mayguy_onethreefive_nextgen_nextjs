'use client';

import ToolsCard from '@/components/Cards/ToolsCard';
import Loading from '@/components/Loading';
import { Container, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ToolCardList } from './configs/constants';

export default function Tools({ toolParam }: { toolParam?: string }) {
	const [isLoading, setIsLoading] = useState(false);
	const [tab, setTab] = useState(0);
	const [favorites, setFavorites] = useState<string[]>([]);
	const router = useRouter();

	const updateFavorites = () => {
		if (typeof window !== 'undefined') {
			const fav = localStorage.getItem('favoriteTools');
			if (fav) setFavorites(JSON.parse(fav));
		}
	};

	const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
		setTab(newValue);
	};

	const handleClose = () => {
		setIsLoading(true);
		router.push('/tools');
	};

	useEffect(() => {
		setIsLoading(false);
	}, [toolParam]);

	useEffect(() => {
		updateFavorites();
		window.addEventListener('storage', updateFavorites);
		return () => {
			window.removeEventListener('storage', updateFavorites);
		};
	}, []);

	return (
		<Container maxWidth="lg">
			<Loading isLoading={isLoading} />
			<Grid container justifyContent="center" mt={5}>
				<Tabs value={tab} onChange={handleTabChange}>
					<Tab
						label={
							<Typography variant="subtitle1" color="text.primary">
								All
							</Typography>
						}
					/>
					<Tab
						label={
							<Typography variant="subtitle1" color="text.primary">
								Favorites
							</Typography>
						}
					/>
				</Tabs>
			</Grid>
			<Grid
				container
				alignContent={'center'}
				justifyContent={'center'}
				sx={{ overflow: 'hidden', display: 'flex', flexDirection: 'row' }}
				mt={2}
			>
				{(tab === 0
					? ToolCardList
					: ToolCardList.filter((tool) => favorites.includes(tool.path))
				).map((tool) => {
					const isSelected = tool.path.split('/').pop() === toolParam;
					return (
						<Grid key={tool.path}>
							{isSelected && tool.component && (
								<tool.component open={isSelected} close={handleClose} />
							)}
							<ToolsCard {...tool} />
						</Grid>
					);
				})}
			</Grid>
		</Container>
	);
}

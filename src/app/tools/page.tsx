'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { color } from '@/styles/color';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';

import { ToolCardList } from './configs/constants';

export default function Tools({ toolParam }: { toolParam?: string }) {
	const { theme } = useTheme();
	const router = useRouter();

	useEffect(() => {
		ReactGA.send({
			hitType: 'pageview',
			page: location.pathname,
			title: 'Tools',
		});
	}, []);

	useEffect(() => {
		ReactGA.event({
			category: 'Tools',
			action: 'Click on Object Handler',
		});
	}, [toolParam]);

	const handleOpen = (index: number) => {
		router.push(ToolCardList[index].path);
	};

	const handleClose = () => {
		router.push('/tools');
	};

	return (
		<Grid
			container
			alignContent={'center'}
			justifyContent={'center'}
			sx={{ overflow: 'hidden', display: 'flex', flexDirection: 'row' }}
			mt={10}
		>
			{ToolCardList.map((tool, index) => {
				const isSelected = tool.path.split('/').pop() === toolParam;
				return (
					<Grid key={index}>
						<tool.component open={isSelected} close={handleClose} index={index} />
						<Card
							sx={{
								width: 500,
								height: 420,
								borderRadius: '20px',
								margin: '10px',
								overflow: 'hidden',
								cursor: 'pointer',
								'&:hover': {
									boxShadow: `0 4px 6px 0 ${color[theme].card.shadow}`,
								},
							}}
							onClick={() => handleOpen(index)}
						>
							<CardHeader title={tool.title} subheader={tool.version} />
							<Grid style={{ height: 250, overflow: 'hidden' }}>
								<CardMedia
									component="img"
									height="250"
									image={tool.imageUrl}
									alt={tool.title}
									sx={{
										transition: 'transform 0.2s ease-in-out',
										objectFit: 'cover',
										width: '100%',
										height: '100%',
										'&:hover': {
											transform: 'scale(1.1)',
											transformOrigin: 'center',
											boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
										},
									}}
								/>
							</Grid>
							<CardContent>
								<Typography variant="body2" color="text.secondary" textAlign={'justify'}>
									{tool.description}
								</Typography>
							</CardContent>
							<CardActions disableSpacing></CardActions>
						</Card>
					</Grid>
				);
			})}
		</Grid>
	);
}

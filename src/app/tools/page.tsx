'use client';

import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import ReactGA from 'react-ga4';

import { ToolCardList } from './configs/constants';

export default function Tools() {
	const [tools, setTools] = useState(ToolCardList);

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
	}, [tools]);

	const handleOpen = (index: number) => {
		setTools(
			tools.map((tool, i) =>
				i === index ? { ...tool, isSelected: true } : { ...tool, isSelected: false }
			)
		);
	};

	const handleClose = (index: number) => {
		setTools(
			tools.map((tool, i) =>
				i === index ? { ...tool, isSelected: false } : { ...tool, isSelected: false }
			)
		);
	};

	return (
		<Grid
			container
			alignContent={'center'}
			justifyContent={'center'}
			sx={{ overflow: 'hidden', display: 'flex', flexDirection: 'row', height: '100%' }}
		>
			{tools.map((tool, index) => (
				<Fragment key={index}>
					<tool.component open={tool.isSelected} close={handleClose} index={index} />
					<Card
						sx={{
							width: 400,
							height: 300,
							borderRadius: '20px',
							transition: 'transform 0.2s ease-in-out',
							'&:hover': {
								transform: 'scale(1.05)',
								boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
							},
							margin: '10px',
						}}
						onClick={() => handleOpen(index)}
					>
						<CardHeader title={tool.title} />
						<CardMedia component="img" height="150" image={tool.imageUrl} alt={tool.title} />
						<CardContent>
							<Typography variant="body2" color="text.secondary" textAlign={'justify'}>
								{tool.description}
							</Typography>
						</CardContent>
						<CardActions disableSpacing></CardActions>
					</Card>
				</Fragment>
			))}
		</Grid>
	);
}

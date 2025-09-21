'use client';

import ToolsCard from '@/components/Cards/ToolsCard';
import Loading from '@/components/Loading';
import {
	Box,
	Container,
	Fade,
	Slide,
	Tab,
	Tabs,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ToolCardList } from './configs/constants';

export default function Tools({ toolParam }: { toolParam?: string }) {
	const [isLoading, setIsLoading] = useState(false);
	const [tab, setTab] = useState(0);
	const [favorites, setFavorites] = useState<string[]>([]);
	const [mounted, setMounted] = useState(false);
	const router = useRouter();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
		setMounted(true);
		updateFavorites();
		window.addEventListener('storage', updateFavorites);
		return () => {
			window.removeEventListener('storage', updateFavorites);
		};
	}, []);

	if (!mounted) {
		return <Loading isLoading={true} />;
	}

	const filteredTools =
		tab === 0 ? ToolCardList : ToolCardList.filter((tool) => favorites.includes(tool.path));

	return (
		<Box
			sx={{
				minHeight: '100vh',
				background: `linear-gradient(135deg, 
					${theme.palette.background.default} 0%, 
					${theme.palette.background.paper} 100%)`,
				py: { xs: 2, md: 4 },
				width: '100%',
				overflow: 'hidden',
			}}
		>
			<Loading isLoading={isLoading} />
			<Container
				maxWidth="xl"
				sx={{
					width: '100%',
					maxWidth: '100%',
					px: { xs: 1, sm: 2, md: 3 },
				}}
			>
				{/* Header Section */}
				<Fade in={mounted} timeout={800}>
					<Box textAlign="center" mb={6}>
						<Typography
							variant="h2"
							component="h1"
							sx={{
								fontWeight: 700,
								background: `linear-gradient(135deg, 
									${theme.palette.primary.main} 0%, 
									${theme.palette.secondary.main} 100%)`,
								backgroundClip: 'text',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								mb: 2,
							}}
						>
							Developer Tools
						</Typography>
						<Typography
							variant="h6"
							color="text.secondary"
							sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
						>
							Bộ công cụ phát triển mạnh mẽ và tiện ích cho developers
						</Typography>
					</Box>
				</Fade>

				{/* Tabs Section */}
				<Slide direction="down" in={mounted} timeout={1000}>
					<Box display="flex" justifyContent="center" mb={4}>
						<Tabs
							value={tab}
							onChange={handleTabChange}
							variant={isMobile ? 'fullWidth' : 'standard'}
							sx={{
								'& .MuiTabs-indicator': {
									height: 3,
									borderRadius: '3px 3px 0 0',
									background: `linear-gradient(90deg, 
										${theme.palette.primary.main} 0%, 
										${theme.palette.secondary.main} 100%)`,
								},
								'& .MuiTab-root': {
									'textTransform': 'none',
									'fontWeight': 600,
									'fontSize': '1rem',
									'minHeight': 48,
									'px': 3,
									'&.Mui-selected': {
										color: theme.palette.primary.main,
									},
									'&:hover': {
										backgroundColor: theme.palette.action.hover,
										borderRadius: '8px 8px 0 0',
									},
								},
							}}
						>
							<Tab
								label={
									<Box display="flex" alignItems="center" gap={1}>
										<Typography variant="subtitle1" fontWeight="inherit">
											All Tools
										</Typography>
										<Box
											sx={{
												px: 1,
												py: 0.5,
												bgcolor: theme.palette.primary.main,
												color: 'white',
												borderRadius: '12px',
												fontSize: '0.75rem',
												fontWeight: 600,
												minWidth: 20,
												textAlign: 'center',
											}}
										>
											{ToolCardList.length}
										</Box>
									</Box>
								}
							/>
							<Tab
								label={
									<Box display="flex" alignItems="center" gap={1}>
										<Typography variant="subtitle1" fontWeight="inherit">
											Favorites
										</Typography>
										<Box
											sx={{
												px: 1,
												py: 0.5,
												bgcolor: theme.palette.error.main,
												color: 'white',
												borderRadius: '12px',
												fontSize: '0.75rem',
												fontWeight: 600,
												minWidth: 20,
												textAlign: 'center',
											}}
										>
											{favorites.length}
										</Box>
									</Box>
								}
							/>
						</Tabs>
					</Box>
				</Slide>

				{/* Tools Grid */}
				<Fade in={mounted} timeout={1200}>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: {
								xs: '1fr',
								sm: 'repeat(auto-fit, minmax(300px, 1fr))',
								md: 'repeat(auto-fit, minmax(320px, 1fr))',
								lg: 'repeat(auto-fit, minmax(300px, 1fr))',
							},
							gap: { xs: 2, md: 3 },
							px: { xs: 1, md: 0 },
							justifyItems: 'center',
							width: '100%',
							maxWidth: '100%',
							overflow: 'hidden',
						}}
					>
						{filteredTools.map((tool, index) => {
							const isSelected = tool.path.split('/').pop() === toolParam;
							return (
								<Box
									key={tool.path}
									sx={{
										width: '100%',
										maxWidth: { xs: '100%', sm: '350px', md: '320px' },
										minWidth: { xs: '280px', sm: '300px' },
									}}
								>
									<Slide direction="up" in={mounted} timeout={1400 + index * 100}>
										<Box>
											{isSelected && tool.component && (
												<tool.component open={isSelected} close={handleClose} />
											)}
											<ToolsCard {...tool} />
										</Box>
									</Slide>
								</Box>
							);
						})}
					</Box>
				</Fade>

				{/* Empty State */}
				{filteredTools.length === 0 && tab === 1 && (
					<Fade in={mounted} timeout={1000}>
						<Box
							textAlign="center"
							py={8}
							sx={{
								opacity: 0.7,
							}}
						>
							<Typography variant="h6" color="text.secondary" gutterBottom>
								Chưa có công cụ yêu thích nào
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Hãy thêm một số công cụ vào danh sách yêu thích của bạn
							</Typography>
						</Box>
					</Fade>
				)}
			</Container>
		</Box>
	);
}

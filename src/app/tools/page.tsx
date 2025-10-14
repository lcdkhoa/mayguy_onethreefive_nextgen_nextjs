'use client';

import ToolsCard from '@/components/Cards/ToolsCard';
import Loading from '@/components/Loading';
import { Search } from '@mui/icons-material';
import {
	Box,
	Container,
	Fade,
	InputAdornment,
	Slide,
	Tab,
	Tabs,
	TextField,
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
	const [searchQuery, setSearchQuery] = useState('');
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
		setSearchQuery(''); // Reset search when switching tabs
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
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

	// Get base tools list based on tab
	const baseTools =
		tab === 0 ? ToolCardList : ToolCardList.filter((tool) => favorites.includes(tool.path));

	// Filter by search query
	const filteredTools = baseTools.filter((tool) => {
		if (!searchQuery.trim()) return true;
		const query = searchQuery.toLowerCase();
		return (
			tool.title.toLowerCase().includes(query) ||
			tool.description.toLowerCase().includes(query) ||
			tool.category.toLowerCase().includes(query) ||
			tool.version.toLowerCase().includes(query)
		);
	});

	return (
		<Box
			sx={{
				minHeight: '100vh',
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
							Playground corner
						</Typography>
						<Typography
							variant="h6"
							color="text.secondary"
							sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
						>
							Mini-tools which make coding, learning, and daily life easier
						</Typography>
					</Box>
				</Fade>

				{/* Tabs and Search Section */}
				<Slide direction="down" in={mounted} timeout={1000}>
					<Box mb={4}>
						{/* Combined Search and Tabs */}
						<Box
							display="flex"
							alignItems="center"
							justifyContent="center"
							flexDirection={{ xs: 'column', md: 'row' }}
							gap={{ xs: 2, md: 2 }}
							sx={{
								px: { xs: 1, md: 0 },
							}}
						>
							{/* Search Bar */}
							<Box
								sx={{
									width: { xs: '100%', md: '350px' },
									flexShrink: 0,
								}}
							>
								<TextField
									fullWidth
									variant="outlined"
									placeholder="Search tools..."
									value={searchQuery}
									onChange={handleSearchChange}
									sx={{
										'& .MuiOutlinedInput-root': {
											'borderRadius': 3,
											'backgroundColor': theme.palette.background.paper,
											'boxShadow':
												theme.palette.mode === 'light'
													? '0 2px 8px rgba(0,0,0,0.1)'
													: '0 2px 8px rgba(0,0,0,0.3)',
											'&:hover': {
												boxShadow:
													theme.palette.mode === 'light'
														? '0 4px 12px rgba(0,0,0,0.15)'
														: '0 4px 12px rgba(0,0,0,0.4)',
											},
											'&.Mui-focused': {
												boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
											},
										},
										'& .MuiInputBase-input': {
											py: 1.5,
											fontSize: '1rem',
										},
									}}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<Search
													sx={{
														color: theme.palette.text.secondary,
														fontSize: '1.2rem',
													}}
												/>
											</InputAdornment>
										),
									}}
								/>
							</Box>

							{/* Tabs */}
							<Box sx={{ flexShrink: 0 }}>
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
													{baseTools.length}
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
						</Box>
					</Box>
				</Slide>

				{/* Tools Grid */}
				<Fade in={mounted} timeout={500}>
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
									<Slide direction="up" in={mounted} timeout={250 + index * 100}>
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
				{filteredTools.length === 0 && (
					<Fade in={mounted} timeout={1000}>
						<Box
							textAlign="center"
							py={8}
							sx={{
								opacity: 0.7,
							}}
						>
							{searchQuery.trim() ? (
								<>
									<Typography variant="h6" color="text.secondary" gutterBottom>
										No results found for &ldquo;{searchQuery}&rdquo;
									</Typography>
									<Typography variant="body2" color="text.secondary">
										Try searching with different keywords or clear filters
									</Typography>
								</>
							) : tab === 1 ? (
								<>
									<Typography variant="h6" color="text.secondary" gutterBottom>
										No favorite tools yet
									</Typography>
									<Typography variant="body2" color="text.secondary">
										Add some tools to your favorite list
									</Typography>
								</>
							) : (
								<>
									<Typography variant="h6" color="text.secondary" gutterBottom>
										No tools found
									</Typography>
									<Typography variant="body2" color="text.secondary">
										Try again later
									</Typography>
								</>
							)}
						</Box>
					</Fade>
				)}
			</Container>
		</Box>
	);
}

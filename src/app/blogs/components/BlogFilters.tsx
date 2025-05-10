'use client';

import { BlogPost } from '@/utils/get-blog-post';
import {
	Box,
	Chip,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { useState } from 'react';

interface BlogFiltersProps {
	posts: BlogPost[];
	onFilterChange: (filteredPosts: BlogPost[]) => void;
}

export default function BlogFilters({ posts, onFilterChange }: BlogFiltersProps) {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

	// Lấy tất cả tags từ các bài viết
	const allTags = Array.from(new Set(posts.flatMap((post) => post.tags || [])));

	// Xử lý tìm kiếm và lọc
	const handleFilterChange = () => {
		let filtered = [...posts];

		// Tìm kiếm theo tiêu đề và nội dung
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(
				(post) =>
					post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query)
			);
		}

		// Lọc theo tags
		if (selectedTags.length > 0) {
			filtered = filtered.filter((post) => selectedTags.every((tag) => post.tags?.includes(tag)));
		}

		// Sắp xếp
		filtered.sort((a, b) => {
			if (sortBy === 'date') {
				const dateA = new Date(a.date).getTime();
				const dateB = new Date(b.date).getTime();
				return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
			} else {
				return sortOrder === 'asc'
					? a.title.localeCompare(b.title)
					: b.title.localeCompare(a.title);
			}
		});

		onFilterChange(filtered);
	};

	return (
		<Box sx={{ mb: 4 }}>
			<Stack spacing={2}>
				<TextField
					fullWidth
					label="Tìm kiếm"
					value={searchQuery}
					onChange={(e) => {
						setSearchQuery(e.target.value);
						handleFilterChange();
					}}
				/>

				<Box>
					<FormControl fullWidth sx={{ mb: 2 }}>
						<InputLabel>Sắp xếp theo</InputLabel>
						<Select
							value={sortBy}
							label="Sắp xếp theo"
							onChange={(e) => {
								setSortBy(e.target.value as 'date' | 'title');
								handleFilterChange();
							}}
						>
							<MenuItem value="date">Ngày đăng</MenuItem>
							<MenuItem value="title">Tiêu đề</MenuItem>
						</Select>
					</FormControl>

					<FormControl fullWidth>
						<InputLabel>Thứ tự</InputLabel>
						<Select
							value={sortOrder}
							label="Thứ tự"
							onChange={(e) => {
								setSortOrder(e.target.value as 'asc' | 'desc');
								handleFilterChange();
							}}
						>
							<MenuItem value="asc">Tăng dần</MenuItem>
							<MenuItem value="desc">Giảm dần</MenuItem>
						</Select>
					</FormControl>
				</Box>

				<Box>
					<Typography variant="subtitle2" gutterBottom>
						Tags:
					</Typography>
					<Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
						{allTags.map((tag) => (
							<Chip
								key={tag}
								label={tag}
								onClick={() => {
									setSelectedTags((prev) =>
										prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
									);
									handleFilterChange();
								}}
								color={selectedTags.includes(tag) ? 'primary' : 'default'}
								sx={{ m: 0.5 }}
							/>
						))}
					</Stack>
				</Box>
			</Stack>
		</Box>
	);
}

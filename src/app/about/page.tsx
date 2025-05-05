import { Box, Container, Typography } from '@mui/material';

export default function About() {
	return (
		<Container maxWidth="lg">
			<Box sx={{ my: 4 }}>
				<Typography variant="h1" gutterBottom>
					Về tôi
				</Typography>
				<Typography variant="body1">
					Tôi là một lập trình viên đam mê công nghệ và thích chia sẻ kiến thức.
				</Typography>
				<Typography variant="body1">
					Blog này là nơi tôi ghi lại những trải nghiệm, suy nghĩ và bài học
					trong quá trình làm việc.
				</Typography>
			</Box>
		</Container>
	);
}

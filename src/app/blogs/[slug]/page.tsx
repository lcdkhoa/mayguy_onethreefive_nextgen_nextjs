import { notFound } from 'next/navigation';

const blogPosts = [
	{
		slug: 'bai-viet-dau-tien',
		title: 'Bài viết đầu tiên',
		content: 'Nội dung bài viết đầu tiên...',
		date: '2024-03-20',
	},
	{
		slug: 'bai-viet-thu-hai',
		title: 'Bài viết thứ hai',
		content: 'Nội dung bài viết thứ hai...',
		date: '2024-03-21',
	},
];

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
	return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function Page({ params }: { params: Params }) {
	const { slug } = await params;
	const post = blogPosts.find((p) => p.slug === slug);

	if (!post) return notFound();

	return (
		<div>
			<h1>{post.title}</h1>
			<p>
				<i>{post.date}</i>
			</p>
			<div>{post.content}</div>
		</div>
	);
}

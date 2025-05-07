import Tools from '../page';

interface ToolPageProps {
	params: Promise<{ tool: string }>;
}

export default async function ToolPage({ params }: ToolPageProps) {
	const { tool } = await params;
	return <Tools toolParam={tool} />;
}

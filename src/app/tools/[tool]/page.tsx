import Tools from '../page';

interface ToolPageProps {
	params: { tool: string };
}

export default function ToolPage({ params }: ToolPageProps) {
	return <Tools toolParam={params.tool} />;
}

import Tools from '../page';

export default function ToolPage({ params }: { params: { tool: string } }) {
	return <Tools toolParam={params.tool} />;
}

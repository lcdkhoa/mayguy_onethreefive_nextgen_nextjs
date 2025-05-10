import { notFound } from 'next/navigation';

import { ToolCardList } from '../configs/constants';
import Tools from '../page';

interface ToolPageProps {
	params: Promise<{ tool: string }>;
}

export default async function ToolPage({ params }: ToolPageProps) {
	const { tool } = await params;
	const toolExists = ToolCardList.some((t) => t.path.split('/').pop() === tool);
	if (!toolExists) {
		notFound();
	}

	return <Tools toolParam={tool} />;
}

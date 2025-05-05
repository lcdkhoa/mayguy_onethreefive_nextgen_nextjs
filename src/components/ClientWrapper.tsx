'use client';

import { usePageTitle } from '@/hooks/usePageTitle';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
	usePageTitle();

	return <>{children}</>;
}

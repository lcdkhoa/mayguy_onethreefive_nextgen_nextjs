'use client';

import { HOME, sections } from '@/configs/constants';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const usePageTitle = () => {
	const pathname = usePathname();

	useEffect(() => {
		const matched = sections.find((section) => section.path === pathname);
		if (matched || pathname === HOME) {
			document.title = matched?.webTitle || `Dang Khoa's corner 🔅`;
		}
	}, [pathname]);
};

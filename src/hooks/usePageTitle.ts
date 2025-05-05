'use client';

import { sections } from '@/configs/constants';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const usePageTitle = () => {
	const pathname = usePathname();

	useEffect(() => {
		const matched = sections.find((section) => section.path === pathname);
		if (matched) {
			document.title = matched.webTitle;
		} else {
			document.title = 'Dang Khoa 🔅';
		}
	}, [pathname]);
};

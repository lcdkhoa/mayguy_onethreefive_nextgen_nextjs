import { SectionProps } from '@/types/section.types';

export const sections: SectionProps[] = [
	{
		title: 'BLOGS',
		width: '10%',
		path: '/blogs',
		iconsURL: '/images/icons/notes.png',
		webTitle: 'Dang Khoa 🔅 Blogs',
		isSelected: false,
	},
	{
		title: 'TOOLS',
		width: '10%',
		path: '/tools',
		iconsURL: '/images/icons/tools.png',
		webTitle: 'Dang Khoa 🔅 Tools',
		isSelected: false,
	},
	{
		title: 'ABOUT',
		width: '10%',
		path: '/about',
		iconsURL: '/images/icons/about.png',
		webTitle: 'Dang Khoa 🔅 About',
		isSelected: false,
	},
];

export const HOME: string = '/';

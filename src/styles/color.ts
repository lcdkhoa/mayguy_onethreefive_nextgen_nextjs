export const color = {
	black: '#000000',
	white: '#ffffff',

	light: {
		primary: {
			main: '#6366F1', // Indigo 500 - Modern purple-blue
			light: '#818CF8', // Indigo 400
			dark: '#4F46E5', // Indigo 600
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#8B5CF6', // Violet 500 - Complementary purple
			light: '#A78BFA', // Violet 400
			dark: '#7C3AED', // Violet 600
			contrastText: '#ffffff',
		},
		error: {
			main: '#EF4444', // Red 500 - Modern red
			light: '#F87171', // Red 400
			dark: '#DC2626', // Red 600
			contrastText: '#ffffff',
		},
		success: {
			main: '#10B981', // Emerald 500 - Modern green
			light: '#34D399', // Emerald 400
			dark: '#059669', // Emerald 600
			contrastText: '#ffffff',
		},
		warning: {
			main: '#F59E0B', // Amber 500 - Modern orange
			light: '#FBBF24', // Amber 400
			dark: '#D97706', // Amber 600
			contrastText: '#ffffff',
		},
		info: {
			main: '#06B6D4', // Cyan 500 - Modern cyan
			light: '#22D3EE', // Cyan 400
			dark: '#0891B2', // Cyan 600
			contrastText: '#ffffff',
		},
		background: {
			default: '#FFFFFF',
			paper: '#F8FAFC', // Slate 50 - Softer background
			body: '#F1F5F9', // Slate 100 - Modern light gray
			header: '#FFFFFF',
			footer: '#F1F5F9',
		},
		text: {
			primary: '#1E293B', // Slate 800 - Modern dark gray
			secondary: '#64748B', // Slate 500 - Balanced gray
		},
		shadow: [
			'none',
			'0px 1px 2px 0px #0000001a',
			'0px 2px 4px 0px #00000033',
			'0px 3px 6px 0px #0000004d',
			'0px 4px 8px 0px #00000066',
			'0px 6px 12px 0px #00000080',
			'0px 8px 16px 0px #00000099',
			'0px 12px 24px 0px #000000b3',
			'0px 16px 32px 0px #000000cc',
			'0px 20px 40px 0px #000000e6',
			'0px 24px 48px 0px #ffffff1a',
		],
	},

	dark: {
		primary: {
			main: '#818CF8', // Indigo 400 - Lighter for dark mode
			light: '#A5B4FC', // Indigo 300
			dark: '#6366F1', // Indigo 500
			contrastText: '#1E293B',
		},
		secondary: {
			main: '#A78BFA', // Violet 400 - Lighter for dark mode
			light: '#C4B5FD', // Violet 300
			dark: '#8B5CF6', // Violet 500
			contrastText: '#1E293B',
		},
		error: {
			main: '#F87171', // Red 400 - Lighter for dark mode
			light: '#FCA5A5', // Red 300
			dark: '#EF4444', // Red 500
			contrastText: '#1E293B',
		},
		success: {
			main: '#34D399', // Emerald 400 - Lighter for dark mode
			light: '#6EE7B7', // Emerald 300
			dark: '#10B981', // Emerald 500
			contrastText: '#1E293B',
		},
		warning: {
			main: '#FBBF24', // Amber 400 - Lighter for dark mode
			light: '#FCD34D', // Amber 300
			dark: '#F59E0B', // Amber 500
			contrastText: '#1E293B',
		},
		info: {
			main: '#22D3EE', // Cyan 400 - Lighter for dark mode
			light: '#67E8F9', // Cyan 300
			dark: '#06B6D4', // Cyan 500
			contrastText: '#1E293B',
		},
		background: {
			default: '#0F172A', // Slate 900 - Modern dark background
			paper: '#1E293B', // Slate 800 - Card background
			body: '#0F172A', // Slate 900 - Page background
			header: '#1E293B',
			footer: '#334155', // Slate 700
		},
		text: {
			primary: '#F8FAFC', // Slate 50 - High contrast white
			secondary: '#CBD5E1', // Slate 300 - Medium contrast gray
		},
		shadow: [
			'none',
			'0px 1px 2px 0px #ffffff1a',
			'0px 2px 4px 0px #ffffff33',
			'0px 3px 6px 0px #ffffff4d',
			'0px 4px 8px 0px #ffffff66',
			'0px 6px 12px 0px #ffffff80',
			'0px 8px 16px 0px #ffffff99',
			'0px 12px 24px 0px #ffffffb3',
			'0px 16px 32px 0px #ffffffcc',
			'0px 20px 40px 0px #ffffffe6',
			'0px 24px 48px 0px #ffffff',
		],
	},
};

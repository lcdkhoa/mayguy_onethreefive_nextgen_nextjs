'use client';

import { darkTheme, lightTheme } from '@/styles/theme';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
	theme: 'light' | 'dark';
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [theme, setTheme] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
		if (savedTheme) {
			setTheme(savedTheme as 'light' | 'dark');
		} else {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			setTheme(prefersDark ? 'dark' : 'light');
		}
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		if (typeof window !== 'undefined') {
			localStorage.setItem('theme', newTheme);
		}
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<MUIThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
				{children}
			</MUIThemeProvider>
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};

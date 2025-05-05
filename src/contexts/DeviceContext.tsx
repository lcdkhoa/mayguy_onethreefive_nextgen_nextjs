'use client';

import { useMediaQuery } from '@mui/material';
import { ReactNode, createContext, useContext } from 'react';

interface DeviceContextType {
	isMobile: boolean;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider = ({ children }: { children: ReactNode }) => {
	const isMobile = useMediaQuery('(max-width: 900px)');

	return (
		<DeviceContext.Provider value={{ isMobile }}>
			{children}
		</DeviceContext.Provider>
	);
};

export const useDevice = () => {
	const context = useContext(DeviceContext);
	if (context === undefined) {
		throw new Error('useDevice must be used within a DeviceProvider');
	}
	return context;
};

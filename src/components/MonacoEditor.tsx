'use client';

import { useTheme } from '@/contexts/ThemeContext';
import MonacoEditor, { OnChange } from '@monaco-editor/react';

const defaultOptions = {
	automaticLayout: true,
	autoIndent: 'full' as const,
	formatOnPaste: true,
	formatOnType: true,
	minimap: { enabled: true },
	wordWrap: 'off' as const,
	quickSuggestions: true,
};

interface MonacoEditorWrapperProps {
	height?: string;
	language?: string;
	value: string;
	onChange: OnChange;
	options?: Record<string, unknown>;
}

const MonacoEditorWrapper: React.FC<MonacoEditorWrapperProps> = ({
	height = '60vh',
	language = 'json',
	value,
	onChange,
	options = {},
	...props
}) => {
	const { theme } = useTheme();
	return (
		<MonacoEditor
			height={height}
			theme={theme === 'light' ? 'vs-light' : 'vs-dark'}
			defaultLanguage={language}
			value={value}
			onChange={onChange}
			options={{ ...defaultOptions, ...options }}
			{...props}
		/>
	);
};

export default MonacoEditorWrapper;

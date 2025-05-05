'use client';

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
	theme?: string;
	language?: string;
	value: string;
	onChange: OnChange;
	options?: Record<string, any>;
}

const MonacoEditorWrapper: React.FC<MonacoEditorWrapperProps> = ({
	height = '60vh',
	theme = 'vs-light',
	language = 'json',
	value,
	onChange,
	options = {},
	...props
}) => {
	return (
		<MonacoEditor
			height={height}
			theme={theme}
			defaultLanguage={language}
			value={value}
			onChange={onChange}
			options={{ ...defaultOptions, ...options }}
			{...props}
		/>
	);
};

export default MonacoEditorWrapper;

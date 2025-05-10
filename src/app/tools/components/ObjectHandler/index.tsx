'use client';

import ButtonWrapper from '@/components/Buttons/Button';
import MonacoEditorWrapper from '@/components/MonacoEditor';
import { FlattenObjects, UnflattenObjects } from '@/utils/object-handler';
import { Dialog, DialogContent, Divider, Grid } from '@mui/material';
import { useState } from 'react';

interface ObjectHandlerProps {
	open: boolean;
	close: () => void;
}

export default function ObjectHandler({ ...props }: ObjectHandlerProps) {
	const { open, close } = props;
	const [text, setText] = useState('');
	const [inputText, setInputText] = useState('Add input_');
	const [outputText, setOutputText] = useState('Add output_');

	const handleClose = () => {
		close();
		setText('');
	};

	const handleAddInput = () => {
		if (inputText === 'Add input_') {
			setInputText('Remove input_');
			const obj = JSON.parse(text);
			Object.keys(obj).forEach((key) => {
				obj['input_' + key] = obj[key];
				delete obj[key];
			});
			setText(JSON.stringify(obj, null, 2));
		} else {
			setInputText('Add input_');
			const obj = JSON.parse(text);
			Object.keys(obj).forEach((key) => {
				obj[key.replace('input_', '')] = obj[key];
				delete obj[key];
			});
			setText(JSON.stringify(obj, null, 2));
		}
	};

	const handleAddOutput = () => {
		if (outputText === 'Add output_') {
			setOutputText('Remove output_');
			const obj = JSON.parse(text);
			Object.keys(obj).forEach((key) => {
				obj['output_' + key] = obj[key];
				delete obj[key];
			});
			setText(JSON.stringify(obj, null, 2));
		} else {
			setOutputText('Add output_');
			const obj = JSON.parse(text);
			Object.keys(obj).forEach((key) => {
				obj[key.replace('output_', '')] = obj[key];
				delete obj[key];
			});
			setText(JSON.stringify(obj, null, 2));
		}
	};

	const handleFlatten = () => {
		console.log('handleFlatten');
		try {
			const obj = JSON.parse(text);
			const flatJson = JSON.stringify(FlattenObjects(obj), null, 2);
			setText(flatJson);
		} catch (error) {
			console.error(error);
			setText('Invalid JSON input.');
		}
	};

	const handleUnflatten = () => {
		try {
			const obj = JSON.parse(text);
			const unflattenJson = JSON.stringify(UnflattenObjects(obj, '_'), null, 2);
			setText(unflattenJson);
		} catch (error) {
			console.error(error);
			setText('Invalid JSON input.');
		}
	};

	const handleOnchange = (value: string | undefined): void => {
		if (value) setText(value);
	};

	return (
		<form>
			<Dialog
				open={open}
				fullWidth={true}
				maxWidth="md"
				keepMounted
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogContent>
					<MonacoEditorWrapper value={text} onChange={handleOnchange} />
				</DialogContent>
				<Divider />
				<Grid container justifyContent={'center'} paddingBottom={2} paddingTop={2}>
					<ButtonWrapper onClick={() => handleUnflatten()}>Convert to Nested</ButtonWrapper>
					<ButtonWrapper onClick={() => handleFlatten()}>Convert to Flat</ButtonWrapper>
					<ButtonWrapper onClick={() => handleAddInput()}>{inputText}</ButtonWrapper>
					<ButtonWrapper onClick={() => handleAddOutput()}>{outputText}</ButtonWrapper>
					<ButtonWrapper onClick={handleClose}>Close</ButtonWrapper>
				</Grid>
			</Dialog>
		</form>
	);
}

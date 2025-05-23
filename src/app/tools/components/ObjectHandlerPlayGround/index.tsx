'use client';

import ButtonWrapper from '@/components/Buttons/Button';
import MonacoEditorWrapper from '@/components/MonacoEditor';
import { FlattenObjects, UnFlatObjects } from '@/utils/object-handler-playground';
// import { FlattenObjects, UnFlatObjects } from '@lcdkhoa/object-handler';
import { Dialog, DialogContent, Divider, Grid } from '@mui/material';
import { useState } from 'react';

import OptionPopover from './components/OptionsPopover';

interface ObjectHandlerProps {
	open: boolean;
	close: () => void;
}

export default function ObjectHandler({ ...props }: ObjectHandlerProps) {
	const { open, close } = props;
	const [text, setText] = useState('');

	const [toolbarOptionsAnchorEl, setToolbarOptionsAnchorEl] = useState<HTMLButtonElement | null>(
		null
	);

	const [splitter, setSelectedSplitter] = useState('_');

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setToolbarOptionsAnchorEl(event.currentTarget);
	};

	const handleCloseOption = () => {
		setToolbarOptionsAnchorEl(null);
	};

	const handleChange = (value: string) => {
		setSelectedSplitter(value);
	};

	const openOption = Boolean(toolbarOptionsAnchorEl);
	const id = openOption ? 'simple-popover' : 'none';

	const handleClose = () => {
		close();
		setText('');
	};

	const handleFlatten = () => {
		try {
			const obj = JSON.parse(text);
			const flatJson = JSON.stringify(FlattenObjects(obj, splitter), null, 2);
			setText(flatJson);
		} catch (error) {
			alert(error);
		}
	};

	const handleUnFlat = () => {
		try {
			const obj = JSON.parse(text);
			const unFlatJson = JSON.stringify(UnFlatObjects(obj, splitter), null, 2);
			setText(unFlatJson);
		} catch (error) {
			alert(error);
		}
	};

	const handleOnchange = (value: string | undefined) => {
		setText(value || '');
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
				<Grid
					container
					direction={'row'}
					justifyContent={'center'}
					paddingBottom={2}
					paddingTop={2}
				>
					<OptionPopover
						id={id}
						openOption={openOption}
						toolbarOptionsAnchorEl={toolbarOptionsAnchorEl}
						handleClick={handleClick}
						handleCloseOption={handleCloseOption}
						handleChange={handleChange}
						splitter={splitter}
					/>
					<ButtonWrapper onClick={() => handleUnFlat()}>Convert to Nested</ButtonWrapper>
					<ButtonWrapper onClick={() => handleFlatten()}>Convert to Flat</ButtonWrapper>

					<ButtonWrapper onClick={handleClose}>Close</ButtonWrapper>
				</Grid>
			</Dialog>
		</form>
	);
}

import TuneIcon from '@mui/icons-material/Tune';
import { IconButton, Menu, MenuItem } from '@mui/material';

interface OptionPopoverProps {
	id: string;
	openOption: boolean;
	toolbarOptionsAnchorEl: any;
	handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	handleCloseOption: () => void;
	handleChange: (value: string) => void;
	splitter: string;
}

const OptionPopover = ({
	id,
	openOption,
	toolbarOptionsAnchorEl,
	handleClick,
	handleCloseOption,
	handleChange,
}: OptionPopoverProps) => {
	const handleChooseSplitter = (value: string) => {
		handleChange(value);
		handleCloseOption();
	};
	return (
		<div title="Options">
			<IconButton
				edge="start"
				color="inherit"
				aria-label="menu"
				onClick={handleClick}
			>
				<TuneIcon />
			</IconButton>
			<Menu
				id={id}
				open={openOption}
				anchorEl={toolbarOptionsAnchorEl}
				onClose={handleCloseOption}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
			>
				<MenuItem onClick={() => handleChooseSplitter('_')}>
					Split by underscore &quot;_&quot;
				</MenuItem>
				<MenuItem onClick={() => handleChooseSplitter('.')}>
					Split by dot &quot;.&quot;
				</MenuItem>
			</Menu>
		</div>
	);
};

export default OptionPopover;

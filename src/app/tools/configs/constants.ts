import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import DescriptionIcon from '@mui/icons-material/Description';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import HttpIcon from '@mui/icons-material/Http';
import InputIcon from '@mui/icons-material/Input';
import OutputIcon from '@mui/icons-material/Output';
import RouteIcon from '@mui/icons-material/Route';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TitleIcon from '@mui/icons-material/Title';
import WarningIcon from '@mui/icons-material/Warning';

import ObjectHandler from '../components/ObjectHandler';
import ObjectHandlerPlayGround from '../components/ObjectHandlerPlayGround';
import SwaggerCreator from '../components/SwaggerCreator';
import UrlOriginRevealer from '../components/UrlOriginRevealer';

export const ToolCardList = [
	{
		id: '9785d3ec-18ff-41ce-8758-91551b477c38',
		title: 'Object-Handler 360F',
		description:
			'Convert complex nested data structures into flat formats and vice versa. This tool only adapt with 360F data structure.',
		coverImage: '/images/cards/object_handler.png',
		component: ObjectHandler,
		path: '/tools/object-handler-360f',
		isSelected: false,
		version: 'v1.0.0',
		category: 'Tools',
	},
	{
		id: 'a96b7c8d-e85f-4972-a9c0-1da28ec12341',
		title: 'Swagger-Creator',
		description:
			'Fill in some needed Information of API, this tool will help creating Yaml Swagger file 3.0',
		coverImage: '/images/cards/swagger_converter.png',
		component: SwaggerCreator,
		path: '/tools/swagger-creator',
		isSelected: false,
		version: 'v1.0.0',
		category: 'Tools',
	},
	{
		id: '7fed39b4-0f29-4d26-894d-d4bb4377722f',
		title: 'Object-Handler PlayGround',
		description:
			'Convert complex nested data structures into flat formats and vice versa, to enhance simplicity and efficiency in data management.',
		coverImage: '/images/cards/object_handler_playground.jpg',
		component: ObjectHandlerPlayGround,
		path: '/tools/object-handler',
		isSelected: false,
		version: 'v1.0.2',
		category: 'Tools',
	},
	{
		id: '346f86db-dfb6-41bf-8b3e-469906e3b97f',
		title: 'URL Original Revealer',
		description:
			'Reveal the original URL of a shortened URL like bit.ly, tinyurl, etc. to avoid the risk of phishing attacks.',
		coverImage: '/images/cards/url_original_revealer.jpg',
		component: UrlOriginRevealer,
		path: '/tools/url-original-revealer',
		isSelected: false,
		version: 'v1.0.0',
		category: 'Tools',
	},
	{
		id: '346f86db-dfb6-41bf-8b3e-469906e3b97g',
		title: 'APTIS Practice',
		description: 'APTIS Practice is a tool that helps you practice for the APTIS exam.',
		coverImage: '/images/cards/aptis-british-council.jpg',
		component: null,
		path: 'https://aptis-mu.vercel.app?loginType=url&username=admin&password=#admin@123',
		isSelected: false,
		version: 'v1.0.0',
		category: 'Tools',
	},
];

export const ToolSwaggers = [
	{
		id: 1,
		title: 'API URL',
		name: 'api_url',
		icon: HttpIcon,
		description: 'Input your API URL, e.g: https://api.example.com',
		textHolder: 'https://api.example.com',
		jsonRender: false,
		hasDropdown: false,
		dropdownValue: [],
		defaultValue: 'https://api.example.com',
	},
	{
		id: 2,
		title: 'API Path',
		name: 'api_path',
		icon: RouteIcon,
		description: 'Input your API Path, e.g: /example',
		textHolder: '/example',
		jsonRender: false,
		hasDropdown: false,
		dropdownValue: [],
		defaultValue: '/example',
	},
	{
		id: 3,
		title: 'API Method',
		name: 'api_method',
		icon: SettingsInputComponentIcon,
		description: 'Choose your API Method, e.g: GET, POST, PUT, DELETE ...',
		textHolder: '[GET, POST, PUT, DELETE]',
		jsonRender: false,
		hasDropdown: true,
		dropdownValue: [
			{
				value: 'GET',
				label: 'GET',
			},
			{
				value: 'POST',
				label: 'POST',
			},
			{
				value: 'PUT',
				label: 'PUT',
			},
			{
				value: 'PATCH',
				label: 'PATCH',
			},
			{
				value: 'DELETE',
				label: 'DELETE',
			},
			{
				value: 'HEAD',
				label: 'HEAD',
			},
			{
				value: 'OPTIONS',
				label: 'OPTIONS',
			},
		],
		defaultValue: 'GET',
	},
	{
		id: 4,
		title: 'API Title',
		name: 'api_title',
		icon: TitleIcon,
		description: 'Input your API Title, e.g: Premium Calculate API',
		textHolder: 'Example API',
		jsonRender: false,
		hasDropdown: false,
		dropdownValue: [],
		defaultValue: 'Example API',
	},
	{
		id: 5,
		title: 'API Description',
		name: 'api_description',
		icon: DescriptionIcon,
		description:
			'Input small description about your API, e.g: This is an example API, which is used for ...',
		textHolder: 'This is an example API',
		jsonRender: false,
		hasDropdown: false,
		dropdownValue: [],
		defaultValue: 'This is an example API',
	},
	{
		id: 6,
		title: 'API Version',
		name: 'api_version',
		icon: FormatListNumberedIcon,
		description: 'Input your API Version, e.g: 1.0.0',
		textHolder: '1.0.0',
		jsonRender: false,
		hasDropdown: false,
		dropdownValue: [],
		defaultValue: '1.0.0',
	},

	{
		id: 7,
		title: 'API Input Schema',
		name: 'api_input_schema',
		icon: InputIcon,
		textHolder: "Please input API's input schema",
		description:
			'Input your API Input Schema, e.g: { "id": "abx-xyz", "name": "example", version: "1.0.0"}',
		jsonRender: true,
		hasDropdown: false,
		dropdownValue: [],
		defaultValue: {},
	},
	{
		id: 8,
		title: 'API Output Schema',
		name: 'api_output_schema',
		icon: OutputIcon,
		textHolder: "Please input API's output schema",
		description:
			'Input your API Output Schema, e.g: { "success": true, "data": { "id": "abx-xyz", "name": "example", version: "1.0.0"}',
		jsonRender: true,
		hasDropdown: false,
		dropdownValue: [],
		defaultValue: {},
	},
	{
		id: 9,
		title: 'API Bad Error Schema',
		name: 'api_bad_error_schema',
		icon: WarningIcon,
		textHolder: "Please input API's bad error schema",
		description:
			'Input your API Bad Error Schema, e.g: { "success": false, "error": { "code": 400, "message": "Bad Request" } }',
		jsonRender: true,
		hasDropdown: false,
		dropdownValue: [],
		defaultValue: {},
	},
	{
		id: 10,
		title: 'API Network Error Schema',
		name: 'api_network_error_schema',
		icon: BrokenImageIcon,
		textHolder: "Please input API's network error schema",
		description:
			'Input your API Network Error Schema, e.g: { "success": false, "error": { "code": 500, "message": "Internal Server Error" } }',
		jsonRender: true,
		hasDropdown: false,
		dropdownValue: [],
		defaultValue: {},
	},
];

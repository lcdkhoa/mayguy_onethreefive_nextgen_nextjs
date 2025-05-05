import yaml from 'js-yaml';
import * as _ from 'lodash';

interface JsonSchema {
	required: string[];
	type: string;
	properties: Record<string, any>;
}

const OthersConverter = (key: string, value: any) => {
	const data = {
		type: typeof value,
		example: value,
		description: key
			.replace(/([A-Z])/g, ' $1')
			.trim()
			.replace(/\b\w/g, (c) => c.toUpperCase()),
	};
	return data;
};

function convertJson(jsonData: object): JsonSchema {
	let result: JsonSchema = {
		required: Object.keys(jsonData),
		type: 'object',
		properties: {},
	};

	Object.entries(jsonData).forEach(([key, value]) => {
		if (
			typeof value === 'object' &&
			value !== null &&
			Object.keys(value).length !== 0 &&
			!Array.isArray(value)
		) {
			result.properties[key] = convertJson(value);
		} else if (Array.isArray(value)) {
			result.properties[key] = {
				type: 'array',
				items: {
					anyOf: value.map((element, index) => {
						const data: any = convertJson(element);
						data.title = 'Object ' + index;
						return data;
					}),
				},
			};
		} else {
			result.properties[key] = OthersConverter(key, value);
		}
	});

	return result;
}

export function ConvertJsonToYaml(
	jsonRequest: Object,
	jsonResponse: Object,
	inputUrl: String,
	inputTitle: String,
	inputDescription: String,
	inputVersion: String,
	inputMethod: String,
	inputPath: any,
	jsonInputBadError: Object,
	jsonInputInternalError: Object
) {
	const body = {
		openapi: '3.0.1',
		info: {
			title: inputTitle,
			description: inputDescription ? inputDescription : inputTitle,
			version: inputVersion ? inputVersion : '',
		},
		servers: [
			{
				url: inputUrl,
			},
		],
		paths: {
			[inputPath]: {
				[inputMethod.toLowerCase()]: {
					tags: [''],
					operationId: '',
					summary: '',
					requestBody: {
						description: '',
						content: {
							'application/json': {
								schema: {
									$ref: '#/components/schemas/InputSchema',
								},
							},
						},
					},
					responses: {
						200: {
							description: 'OK',
							content: {
								'application/json': {
									schema: {
										$ref: '#/components/schemas/OutputSchema',
									},
								},
							},
						},
						400: {
							description: 'Bad Request',
							content: {
								'application/json': {
									schema: {
										$ref: '#/components/schemas/BadRequestSchema',
									},
								},
							},
						},
						500: {
							description: 'Internal Server Error',
							content: {
								'application/json': {
									schema: {
										$ref: '#/components/schemas/InternalErrorSchema',
									},
								},
							},
						},
					},
				},
			},
		},
		tags: [
			{
				name: '',
			},
		],
		components: {
			schemas: {
				InputSchema: convertJson(jsonRequest),
				OutputSchema: convertJson(jsonResponse),
				BadRequestSchema: _.isEmpty(jsonInputBadError)
					? {}
					: convertJson(jsonInputBadError),
				InternalErrorSchema: _.isEmpty(jsonInputInternalError)
					? {}
					: convertJson(jsonInputInternalError),
			},
		},
	};
	const yamlData = yaml.dump(body);
	return yamlData;
}

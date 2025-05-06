import yaml from 'js-yaml';
import * as _ from 'lodash';

interface JsonSchema {
	required: string[];
	type: string;
	properties: Record<string, unknown>;
	title?: string;
}

const OthersConverter = (key: string, value: unknown) => {
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
	const result: JsonSchema = {
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
						const data: JsonSchema = convertJson(element);
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
	jsonRequest: object,
	jsonResponse: object,
	inputUrl: string,
	inputTitle: string,
	inputDescription: string,
	inputVersion: string,
	inputMethod: string,
	inputPath: string,
	jsonInputBadError: object,
	jsonInputInternalError: object
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
				BadRequestSchema: _.isEmpty(jsonInputBadError) ? {} : convertJson(jsonInputBadError),
				InternalErrorSchema: _.isEmpty(jsonInputInternalError)
					? {}
					: convertJson(jsonInputInternalError),
			},
		},
	};
	const yamlData = yaml.dump(body);
	return yamlData;
}

const FlattenObjects = (table: object, splitKey: string = '_') => {
	const reduce = (path: string, accumulator: Record<string, unknown>, table: object) => {
		if (Array.isArray(table)) {
			const { length } = table;

			if (length) {
				let index = 0;

				while (index < length) {
					const property = `${path}[${index}]`;
					const item = table[index];
					index += 1;
					if (Object(item) !== item) accumulator[property] = item;
					else reduce(property, accumulator, item);
				}
			} else accumulator[path] = table;
		} else {
			let empty = true;

			if (path) {
				Object.entries(table).forEach(([property, item]) => {
					const prop = `${path}${splitKey}${property}`;
					empty = false;
					if (Object(item) !== item) accumulator[prop] = item;
					else reduce(prop, accumulator, item);
				});
			} else {
				Object.entries(table).forEach(([property, item]) => {
					empty = false;
					if (Object(item) !== item) accumulator[property] = item;
					else reduce(property, accumulator, item);
				});
			}

			if (empty) accumulator[path] = table;
		}

		return accumulator;
	};
	return reduce('', {}, table);
};

const UnFlatObjects = (json: Record<string, unknown>, keySplit: string = '_') => {
	const result: Record<string, unknown> = {};
	Object.entries(json).forEach(([key, value]) => {
		let current: Record<string, unknown> | unknown[] = result;
		const parts = key.split(keySplit);
		parts.forEach((part, i) => {
			const isArray = /^([^\\[]+)\[(\d+)\]$/.exec(part);
			if (isArray) {
				const arrKey = isArray[1];
				const arrIndex = parseInt(isArray[2]);
				const currObj = current as Record<string, unknown>;
				if (!currObj[arrKey]) {
					currObj[arrKey] = [];
				}
				if (i === parts.length - 1) {
					(currObj[arrKey] as unknown[])[arrIndex] = value;
				} else {
					if (!(currObj[arrKey] as unknown[])[arrIndex]) {
						(currObj[arrKey] as unknown[])[arrIndex] = {};
					}
					current = (currObj[arrKey] as unknown[])[arrIndex] as Record<string, unknown>;
				}
			} else if (i === parts.length - 1) {
				(current as Record<string, unknown>)[part] = value;
			} else {
				if (!(current as Record<string, unknown>)[part]) {
					(current as Record<string, unknown>)[part] = {};
				}
				current = (current as Record<string, unknown>)[part] as Record<string, unknown>;
			}
		});
	});
	return result;
};

export { FlattenObjects, UnFlatObjects };

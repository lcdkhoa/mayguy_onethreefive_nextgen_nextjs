const FlattenObjects = ((isArray, wrapped) => {
	const reduce = (path: string, accumulator: Record<string, unknown>, table: unknown) => {
		if (isArray(table)) {
			const { length } = table;

			if (length) {
				let index = 0;

				while (index < length) {
					const property = `${path}${index}`;
					const item = table[index];
					index += 1;
					if (wrapped(item) !== item) accumulator[property] = item;
					else reduce(property, accumulator, item);
				}
			} else accumulator[path] = table;
		} else {
			let empty = true;

			if (path) {
				Object.entries(table as Record<string, unknown>).forEach(([property, item]) => {
					const prop = `${path}_${property}`;
					empty = false;
					if (wrapped(item) !== item) accumulator[prop] = item;
					else reduce(prop, accumulator, item);
				});
			} else {
				Object.entries(table as Record<string, unknown>).forEach(([property, item]) => {
					empty = false;
					if (wrapped(item) !== item) accumulator[property] = item;
					else reduce(property, accumulator, item);
				});
			}

			if (empty) accumulator[path] = table;
		}

		return accumulator;
	};
	return (table: Record<string, unknown>) => reduce('', {}, table);
})(Array.isArray, Object);

interface NestedObject {
	[key: string]: unknown;
}

const UnflattenObjects = (json: Record<string, unknown>, splitKey: string = '_') => {
	const result: NestedObject = {};
	Object.entries(json).forEach(([key, value]) => {
		const parts = key.split(splitKey);
		let current: NestedObject = result;
		parts.forEach((part, i) => {
			const arrayPattern = /^(\D+)(\d+)$/;
			const isArray = arrayPattern.exec(part);
			const isEnd = i === parts.length - 1;
			if (isArray && !isEnd) {
				const arrKey = isArray[1];
				const arrIndex = parseInt(isArray[2]);
				if (!current[arrKey]) {
					current[arrKey] = [];
				}
				if (i === parts.length - 1) {
					(current[arrKey] as unknown[])[arrIndex] = value;
				} else {
					if (!(current[arrKey] as unknown[])[arrIndex]) {
						(current[arrKey] as unknown[])[arrIndex] = {};
					}
					current = (current[arrKey] as unknown[])[arrIndex] as NestedObject;
				}
			} else if (i === parts.length - 1) {
				(current as Record<string, unknown>)[part] = value;
			} else {
				if (!(current as Record<string, unknown>)[part]) {
					(current as Record<string, unknown>)[part] = {};
				}
				current = (current as Record<string, unknown>)[part] as NestedObject;
			}
		});
	});
	return result;
};

export { FlattenObjects, UnflattenObjects };

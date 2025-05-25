import { readFile } from 'node:fs/promises';

import { CONTENTS } from '@/lib/constants';

type Data = {
	[page: string]: string;
};

const CWD = process.cwd();

async function getData(data = CONTENTS): Promise<Data> {
	const texts = await Promise.all(
		data.map(function (page: string) {
			return readFile(`${CWD}/src/data/${page}.html`, 'utf-8');
		})
	);

	return data.reduce(function (acc: Data, page, i) {
		return {
			...acc,
			[page]: texts[i]
		};
	}, {});
}

export { type Data, getData };

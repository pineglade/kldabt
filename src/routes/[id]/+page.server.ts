import { getData } from '@/data';

import type { PageServerLoad } from './$types';

async function load({ params }: Parameters<PageServerLoad>[0]) {
	const data = await getData([`/${params.id}`]);
	return data;
}

export { load };

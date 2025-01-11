import { getCategories } from '$lib/util';
import { json } from '@sveltejs/kit';

export async function GET() {
	return json(await getCategories());
}

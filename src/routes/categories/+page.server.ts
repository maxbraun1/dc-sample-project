import { db } from '$lib/server/db';
import { categories } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { getCategories } from '$lib/util';

export const actions = {
	delete: async (event) => {
		const formData = await event.request.formData();

		const id = formData.get('id') || '';

		await db.delete(categories).where(eq(categories.id, id.toString()));
	}
};

export const load: PageServerLoad = async () => {
	const allCategories = await getCategories();
	return { categories: allCategories };
};

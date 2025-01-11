import { db } from '$lib/server/db';
import { categories } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { getCategories } from '$lib/util';
import { fail } from '@sveltejs/kit';

export const actions = {
	delete: async (event) => {
		// Delete a category
		const formData = await event.request.formData();

		const id = formData.get('id') || '';

		if (!id) return fail(400);

		await db.delete(categories).where(eq(categories.id, id.toString()));
	}
};

export const load: PageServerLoad = async () => {
	const allCategories = await getCategories();
	return { categories: allCategories };
};

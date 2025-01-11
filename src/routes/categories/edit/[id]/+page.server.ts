import { db } from '$lib/server/db';
import { categories } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const category = await db.select().from(categories).where(eq(categories.id, params.id));
	return { category: category[0] };
};

export const actions = {
	default: async (event) => {
		// Update a category
		const formData = await event.request.formData();

		const categoryId = formData.get('id') || '';
		const categoryName = formData.get('name') || '';

		// Validation
		if (!categoryId) return fail(400);
		if (categoryName.toString().length < 1) return fail(400);

		await db
			.update(categories)
			.set({ name: categoryName.toString() })
			.where(eq(categories.id, categoryId.toString()));

		redirect(303, '/categories');
	}
};

import { db } from '$lib/server/db';
import { categories } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		// Add a category
		const formData = await event.request.formData();

		const categoryName = formData.get('name') || '';

		// Validation
		if (categoryName.toString().length < 1) return fail(400);

		await db.insert(categories).values({
			name: categoryName.toString()
		});

		redirect(303, '/categories');
	}
};

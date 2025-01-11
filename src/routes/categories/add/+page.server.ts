import { db } from '$lib/server/db';
import { categories } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		const categoryName = formData.get('name') || '';

		if (categoryName.toString().length < 1) return;

		await db.insert(categories).values({
			name: categoryName.toString()
		});

		redirect(303, '/categories');
	}
};

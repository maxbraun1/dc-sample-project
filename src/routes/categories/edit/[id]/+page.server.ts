import { db } from '$lib/server/db';
import { categories } from '$lib/server/db/schema';
import { getCategoryById } from '$lib/util';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const category = await getCategoryById(params.id);
	return { category };
};

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		const categoryId = formData.get('id') || '';
		const categoryName = formData.get('name') || '';

		// console.log('Category ID', categoryId);
		// console.log('Category Name', categoryName);

		await db
			.update(categories)
			.set({ name: categoryName.toString() })
			.where(eq(categories.id, categoryId.toString()));

		redirect(303, '/categories');
	}
};

import { db } from '$lib/server/db';
import { categories, products } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		const productName = formData.get('name') || '';
		const productPrice = formData.get('price');
		const productCategory = formData.get('category');

		// Validation
		if (productName.toString().length < 1) return;

		await db.insert(products).values({
			name: productName.toString(),
			price: Number(productPrice),
			categoryId: productCategory?.toString()
		});

		redirect(303, '/');
	}
};

export const load: PageServerLoad = async () => {
	const allCategories = await db.select().from(categories).orderBy(categories.name);
	return { categories: allCategories };
};

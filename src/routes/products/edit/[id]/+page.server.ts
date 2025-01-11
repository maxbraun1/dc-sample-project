import { db } from '$lib/server/db';
import { products } from '$lib/server/db/schema';
import { getCategories, getProductById } from '$lib/util';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		const productId = formData.get('id') || '';
		const productName = formData.get('name') || '';
		const productPrice = formData.get('price');
		const productCategory = formData.get('category');

		// Validation
		if (productName.toString().length < 1) return;

		await db
			.update(products)
			.set({
				name: productName.toString(),
				price: Number(productPrice),
				categoryId: productCategory?.toString()
			})
			.where(eq(products.id, productId.toString()));

		redirect(303, '/');
	}
};

export const load: PageServerLoad = async ({ params }) => {
	const product = await getProductById(params.id);
	const categories = await getCategories();
	return { product, categories };
};

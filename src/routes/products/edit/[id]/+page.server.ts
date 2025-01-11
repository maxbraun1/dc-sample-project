import { db } from '$lib/server/db';
import { products } from '$lib/server/db/schema';
import { getCategories } from '$lib/util';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		// Update a product
		const formData = await event.request.formData();

		const productId = formData.get('id') || '';
		const productName = formData.get('name') || '';
		const productPrice = Number(formData.get('price'));
		const productCategory = formData.get('category');

		// Validation
		if (!productId) return fail(400);
		if (productName.toString().length < 1) return fail(400);
		if (productPrice < 1 || productPrice > 10000) return fail(400);

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
	const product = await db.select().from(products).where(eq(products.id, params.id));
	const categories = await getCategories();
	return { product: product[0], categories };
};

import { db } from '$lib/server/db';
import { categories, products } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { getCategories } from '$lib/util';

export const actions = {
	delete: async (event) => {
		const formData = await event.request.formData();

		const id = formData.get('id') || '';

		await db.delete(products).where(eq(products.id, id.toString()));
	}
};

export const load: PageServerLoad = async () => {
	const productsWithCategory = await db
		.select({
			productId: products.id,
			productName: products.name,
			productPrice: products.price,
			categoryId: categories.id,
			categoryName: categories.name
		})
		.from(products)
		.leftJoin(categories, eq(products.categoryId, categories.id));

	const allCategories = await getCategories();

	console.log(productsWithCategory);
	return { products: productsWithCategory, categories: allCategories };
};

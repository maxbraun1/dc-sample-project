import { db } from '$lib/server/db';
import { categories, products } from '$lib/server/db/schema';
import { count, eq } from 'drizzle-orm';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async () => {
	const product = await db.select({ count: count() }).from(products);
	console.log(product);
	const categoryCounts = await db
		.select({ count: count(), categoryName: categories.name })
		.from(products)
		.leftJoin(categories, eq(products.categoryId, categories.id))
		.groupBy(products.categoryId, categories.name);

	return { categoryCounts, productCount: product[0].count };
};

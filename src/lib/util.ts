import { eq } from 'drizzle-orm';
import { db } from './server/db';
import { categories, products } from './server/db/schema';

export async function getCategories() {
	const allCategories = await db.select().from(categories).orderBy(categories.name);
	return allCategories;
}

export async function getProductById(id: string) {
	const product = await db.select().from(products).where(eq(products.id, id));
	return product[0];
}

export async function getCategoryById(id: string) {
	const product = await db.select().from(categories).where(eq(categories.id, id));
	return product[0];
}

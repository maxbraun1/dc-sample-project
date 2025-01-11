import { db } from './server/db';
import { categories } from './server/db/schema';

export async function getCategories() {
	const allCategories = await db.select().from(categories).orderBy(categories.name);
	return allCategories;
}

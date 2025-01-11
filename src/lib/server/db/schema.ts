import { pgTable, uuid, text, foreignKey, real } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
	id: uuid('id').defaultRandom().primaryKey().notNull(),
	name: text('name').notNull()
});

export const products = pgTable(
	'products',
	{
		id: uuid('id').defaultRandom().primaryKey().notNull(),
		name: text('name').notNull(),
		price: real('price'),
		categoryId: uuid('category_id').defaultRandom()
	},
	(table) => {
		return {
			productsCategoryIdFkey: foreignKey({
				columns: [table.categoryId],
				foreignColumns: [categories.id],
				name: 'products_category_id_fkey'
			}).onDelete('set null')
		};
	}
);

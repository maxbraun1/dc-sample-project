type Category = {
	id: string;
	name: string;
};

export const categoriesStore: { categories: Category[] | null } = $state({
	categories: null
});

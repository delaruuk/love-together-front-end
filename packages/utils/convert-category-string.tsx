export const convertCategoryString = (category: string) => {
	const convertedString = category?.replace(/\s+/g, "-").toLowerCase();
	return convertedString;
};

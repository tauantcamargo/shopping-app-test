const API_URL = process.env.EXPO_PUBLIC_API_URL;

export type Product = {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: Rating;
};

export type Rating = {
	rate: number;
	count: number;
};

export const getProducts = async (): Promise<Product[]> => {
	const response = await fetch(`${API_URL}/products`);
	const data = await response.json();
	return data;
};

export const getProduct = async (id: string): Promise<Product> => {
	const response = await fetch(`${API_URL}/products/${id}`);
	const data = await response.json();
	return data;
};

export const getCategories = async (): Promise<string[]> => {
	const response = await fetch(`${API_URL}/products/categories`);
	const data = await response.json();
	return data;
};

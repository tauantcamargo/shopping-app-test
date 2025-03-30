import {
	ActivityIndicator,
	Button,
	FlatList,
	Pressable,
	RefreshControl,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getProducts, type Product } from "@/shared/utils/api";
import { FlashList } from "@shopify/flash-list";
import { useCallback, useMemo, useState } from "react";
import ProductCard from "@/domains/products/components/ProductCard";
import { COLORS } from "@/shared/constants/Colors";
import { Stack } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import { ProductShimmerGrid } from "@/domains/products/components/ProductShimmer";
import * as Sentry from "@sentry/react-native";

const Index = () => {
	const headerHeight = useHeaderHeight();
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [search, setSearch] = useState("");
	const {
		data: products = [],
		isLoading: isProductsLoading,
		isRefetching: isProductsRefetching,
		refetch: refetchProducts,
	} = useQuery({
		queryKey: ["products"],
		queryFn: getProducts,
	});

	const {
		data: categories = [],
		isLoading: isCategoriesLoading,
		refetch: refetchCategories,
		isRefetching: isCategoriesRefetching,
	} = useQuery({
		queryKey: ["categories"],
		queryFn: getCategories,
	});

	const allCategories = ["all", ...categories];

	const handleCategoryPress = (category: string) => {
		setSelectedCategory(category);
	};

	const refetch = () => {
		refetchProducts();
		refetchCategories();
	};

	const filteredProductsByCategory = useMemo(() => {
		if (selectedCategory === "all") return products;

		return products.filter((product) => product.category === selectedCategory);
	}, [selectedCategory, products]);

	const filteredProductsBySearch = useMemo(() => {
		if (!search) return filteredProductsByCategory;

		return filteredProductsByCategory.filter((product) =>
			product.title.toLowerCase().includes(search.toLowerCase()),
		);
	}, [search, filteredProductsByCategory]);

	const filteredProducts = useMemo(() => {
		if (selectedCategory === "all") return filteredProductsBySearch;

		return filteredProductsByCategory;
	}, [filteredProductsByCategory, filteredProductsBySearch, selectedCategory]);

	const isRefetching = isProductsRefetching || isCategoriesRefetching;

	const handleSearch = (text: string) => {
		setSelectedCategory("all");
		setSearch(text);
	};

	const renderItem = useCallback(({ item }: { item: Product }) => {
		return <ProductCard product={item} />;
	}, []);

	return (
		<View style={[styles.container, { paddingTop: headerHeight }]}>
			<Stack.Screen
				name="index"
				options={{
					headerSearchBarOptions: {
						onChangeText: (e) => {
							handleSearch(e.nativeEvent.text);
						},
					},
				}}
			/>

			<Button
				title="Try!"
				onPress={() => {
					Sentry.captureException(new Error("First error"));
				}}
			/>

			{isCategoriesLoading ? (
				<ActivityIndicator color={COLORS.primary} size="large" />
			) : (
				<View style={styles.header}>
					<Text>Categories</Text>

					<FlatList
						data={allCategories}
						renderItem={({ item }) => (
							<Pressable
								style={[
									styles.category,
									selectedCategory === item && styles.categorySelected,
								]}
								onPress={() => handleCategoryPress(item)}
							>
								<Text
									style={[
										styles.categoryText,
										selectedCategory === item && styles.categoryTextSelected,
									]}
								>
									{item}
								</Text>
							</Pressable>
						)}
						keyExtractor={(item) => item}
						horizontal
						showsHorizontalScrollIndicator={false}
						ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
					/>
				</View>
			)}
			{isProductsLoading ? (
				<ProductShimmerGrid />
			) : (
				<FlashList
					data={filteredProducts}
					keyExtractor={(item) => item.id.toString()}
					renderItem={renderItem}
					estimatedItemSize={200}
					numColumns={2}
					contentContainerStyle={{ padding: 8 }}
					ListEmptyComponent={
						<View style={styles.emptyContainer}>
							<Text>No products found</Text>
						</View>
					}
					refreshControl={
						<RefreshControl
							refreshing={isRefetching}
							onRefresh={refetch}
							tintColor={COLORS.primary}
						/>
					}
					ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
				/>
			)}
		</View>
	);
};

export default Index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: 16,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		marginBottom: 15,
		gap: 10,
	},
	category: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 16,
		backgroundColor: "#f0f0f0",
	},
	categoryText: {
		color: "black",
	},
	categorySelected: {
		backgroundColor: COLORS.primary,
	},
	categoryTextSelected: {
		color: "white",
	},
	searchInput: {
		padding: 10,
		borderRadius: 16,
		backgroundColor: "#f0f0f0",
	},
});

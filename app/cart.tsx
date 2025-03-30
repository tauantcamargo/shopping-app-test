import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useCartStore } from "@/shared/store/cartStore";
import { FlashList } from "@shopify/flash-list";
import CartItem from "@/domains/cart/components/CartItem";

const Page = () => {
	const { products, total } = useCartStore();

	return (
		<View style={styles.container}>
			<FlashList
				data={products}
				renderItem={({ item }) => <CartItem product={item} />}
				estimatedItemSize={200}
				ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
				ListEmptyComponent={() => <Text>No products in cart</Text>}
				ListHeaderComponent={() => (
					<View style={styles.totalContainer}>
						{products.length && (
							<Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
						)}
					</View>
				)}
			/>
		</View>
	);
};

export default Page;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	totalText: {
		fontSize: 16,
		fontWeight: "bold",
	},
	totalContainer: {
		padding: 10,
		alignItems: "center",
	},
});

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useCartStore } from "@/shared/store/cartStore";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { COLORS } from "@/shared/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import type { Product } from "@/shared/utils/api";

const Page = () => {
	const { products, total, addProduct, reduceProduct } = useCartStore();

	const handleQuantityChanged = (
		type: "increment" | "decrement",
		item: Product,
	) => {
		if (type === "increment") {
			addProduct(item);
		} else {
			reduceProduct(item);
		}
	};

	return (
		<View style={styles.container}>
			<FlashList
				data={products}
				renderItem={({ item }) => (
					<View style={styles.cartItemContainer}>
						<Image source={{ uri: item.image }} style={styles.image} />
						<View style={styles.itemContainer}>
							<Text style={styles.cartItemName} numberOfLines={2}>
								{item.title}
							</Text>
							<Text>Price: ${item.price}</Text>
						</View>
						<View style={styles.quantityContainer}>
							<TouchableOpacity
								onPress={() => handleQuantityChanged("decrement", item)}
								style={styles.quantityButton}
							>
								<Ionicons name="remove" size={24} color="black" />
							</TouchableOpacity>
							<Text style={[styles.cartItemQuantity]}>{item.quantity}</Text>
							<TouchableOpacity
								onPress={() => handleQuantityChanged("increment", item)}
								style={styles.quantityButton}
							>
								<Ionicons name="add" size={24} color="black" />
							</TouchableOpacity>
						</View>
					</View>
				)}
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
	cartItemContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 20,
		backgroundColor: "#fff",
		height: 80,
	},
	image: {
		width: 50,
		height: "100%",
		borderRadius: 10,
		resizeMode: "contain",
	},
	itemContainer: {
		flex: 1,
	},
	cartItemName: {
		fontSize: 16,
		fontWeight: "600",
	},
	quantityContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	quantityButton: {
		padding: 10,
	},
	cartItemQuantity: {
		fontWeight: "bold",
		backgroundColor: COLORS.primary,
		fontSize: 16,
		padding: 5,
		width: 30,
		color: "white",
		textAlign: "center",
	},
	totalText: {
		fontSize: 16,
		fontWeight: "bold",
	},
	swipeable: {
		height: 80,
	},
	leftAction: {
		backgroundColor: "red",
		width: 100,
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	totalContainer: {
		padding: 10,
		alignItems: "center",
	},
});

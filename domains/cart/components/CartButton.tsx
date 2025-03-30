import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useCartStore } from "@/shared/store/cartStore";
import { COLORS } from "@/shared/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const CartButton = () => {
	const { count } = useCartStore();
	return (
		<Pressable style={styles.container}>
			<Ionicons name="cart-outline" size={24} color="white" />
			<Text style={styles.count}>{count}</Text>
		</Pressable>
	);
};

export default CartButton;

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.primary,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 50,
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
	},
	count: {
		color: "white",
		fontSize: 12,
		fontWeight: "bold",
	},
});

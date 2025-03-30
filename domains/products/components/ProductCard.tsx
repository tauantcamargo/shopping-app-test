import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import type { Product } from "@/shared/utils/api";
import { Link } from "expo-router";
import { Image } from "expo-image";
import { COLORS } from "@/shared/constants/Colors";

type ProductCardProps = {
	product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
	return (
		<Link href={`/product/${product.id}`} asChild>
			<Pressable style={styles.productCard}>
				<Image
					source={{ uri: product.image }}
					style={styles.image}
					contentFit="cover"
				/>
				<View style={styles.productInfo}>
					<Text style={styles.productTitle}>{product.title}</Text>
					<Text style={styles.productPrice}>${product.price}</Text>
				</View>
			</Pressable>
		</Link>
	);
};

export default ProductCard;

const styles = StyleSheet.create({
	productCard: {
		flex: 1,
		margin: 8,
		gap: 8,
		padding: 12,
		borderRadius: 12,
		backgroundColor: "#fff",
		boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
	},
	image: {
		width: "100%",
		height: 150,
		borderRadius: 12,
	},
	productInfo: {
		gap: 4,
	},
	productTitle: {
		fontSize: 14,
		fontWeight: "500",
	},
	productPrice: {
		fontSize: 16,
		fontWeight: "600",
		color: COLORS.primary,
	},
});

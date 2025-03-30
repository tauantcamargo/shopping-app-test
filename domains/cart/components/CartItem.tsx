import type { Product } from "@/shared/utils/api";
import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import ReanimatedSwipeable, {
	type SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import { Ionicons } from "@expo/vector-icons";
import { type CartProduct, useCartStore } from "@/shared/store/cartStore";
import { COLORS } from "@/shared/constants/Colors";
import { useRef } from "react";
import Reanimated, {
	useAnimatedStyle,
	type SharedValue,
} from "react-native-reanimated";
type CartItemProps = {
	product: CartProduct;
};

const LeftAction = (
	progress: SharedValue<number>,
	dragX: SharedValue<number>,
	onShouldDelete: () => void,
) => {
	const styleAnimation = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: dragX.value - 100 }],
		};
	});

	return (
		<Reanimated.View style={[styles.leftAction, styleAnimation]}>
			<TouchableOpacity onPress={onShouldDelete}>
				<Ionicons name="trash" size={24} color="white" />
			</TouchableOpacity>
		</Reanimated.View>
	);
};

const CartItem = ({ product }: CartItemProps) => {
	const { addProduct, reduceProduct } = useCartStore();
	const swipeableRef = useRef<SwipeableMethods>(null);

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

	const onShouldDelete = () => {
		swipeableRef.current?.close();

		for (let i = 0; i < product.quantity; i++) {
			reduceProduct(product);
		}
	};

	return (
		<ReanimatedSwipeable
			ref={swipeableRef}
			leftThreshold={50}
			friction={2}
			containerStyle={styles.swipeable}
			renderLeftActions={(progress, dragX) =>
				LeftAction(progress, dragX, onShouldDelete)
			}
		>
			<View style={styles.cartItemContainer}>
				<Image
					source={{ uri: product.image }}
					style={styles.image}
					contentFit="contain"
				/>
				<View style={styles.itemContainer}>
					<Text style={styles.cartItemName} numberOfLines={2}>
						{product.title}
					</Text>
					<Text>Price: ${product.price}</Text>
				</View>
				<View style={styles.quantityContainer}>
					<TouchableOpacity
						onPress={() => handleQuantityChanged("decrement", product)}
						style={styles.quantityButton}
					>
						<Ionicons name="remove" size={24} color="black" />
					</TouchableOpacity>
					<Text style={[styles.cartItemQuantity]}>{product.quantity}</Text>
					<TouchableOpacity
						onPress={() => handleQuantityChanged("increment", product)}
						style={styles.quantityButton}
					>
						<Ionicons name="add" size={24} color="black" />
					</TouchableOpacity>
				</View>
			</View>
		</ReanimatedSwipeable>
	);
};

export default CartItem;

const styles = StyleSheet.create({
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
});

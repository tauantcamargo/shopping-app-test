import { router, Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import CartButton from "@/domains/cart/components/CartButton";
import { useMMKVDevTools } from "@dev-plugins/react-native-mmkv";
import { storage } from "@/shared/store/mmkv";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/shared/constants/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
		},
	},
});

export default function RootLayout() {
	useReactQueryDevTools(queryClient);
	useMMKVDevTools({
		storage,
	});

	return (
		<QueryClientProvider client={queryClient}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<Stack>
					<Stack.Screen
						name="index"
						options={{
							title: "Bunch Products",
							headerShadowVisible: false,
							headerRight: () => <CartButton />,
							headerSearchBarOptions: {
								placeholder: "Search Products",
								hideWhenScrolling: false,
								hideNavigationBar: false,
							},
						}}
					/>

					<Stack.Screen
						name="product/[id]"
						options={{
							title: "Product",
							headerShadowVisible: false,
							headerBackTitle: "Products",
						}}
					/>

					<Stack.Screen
						name="cart"
						options={{
							title: "Your Cart",
							presentation: "modal",
							headerShadowVisible: false,
							contentStyle: {
								backgroundColor: "white",
							},
							headerLeft: () => (
								<Pressable onPress={() => router.dismiss()}>
									<Ionicons name="close" size={24} color="white" />
								</Pressable>
							),
							headerStyle: {
								backgroundColor: COLORS.primary,
							},
							headerTitleStyle: {
								color: "white",
							},
						}}
					/>
				</Stack>
			</GestureHandlerRootView>
		</QueryClientProvider>
	);
}

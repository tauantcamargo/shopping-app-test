import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import CartButton from "@/domains/cart/components/CartButton";
import { useMMKVDevTools } from "@dev-plugins/react-native-mmkv";
import { storage } from "@/shared/store/mmkv";

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
			</Stack>
		</QueryClientProvider>
	);
}

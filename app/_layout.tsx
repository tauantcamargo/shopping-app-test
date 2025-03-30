import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import CartButton from "@/domains/cart/components/CartButton";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
		},
	},
});

export default function RootLayout() {
	useReactQueryDevTools(queryClient);

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

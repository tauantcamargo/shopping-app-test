import { router, Stack, useNavigationContainerRef } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import CartButton from "@/domains/cart/components/CartButton";
import { useMMKVDevTools } from "@dev-plugins/react-native-mmkv";
import { storage } from "@/shared/store/mmkv";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/shared/constants/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Sentry from "@sentry/react-native";
import { useEffect } from "react";

const navigationIntegration = Sentry.reactNavigationIntegration({
	enableTimeToInitialDisplay: true, // Only in native builds, not in Expo Go.
});

Sentry.init({
	dsn: "https://521d06a3c11b3b0e17d91c178698f0e8@o4508032641531904.ingest.us.sentry.io/4509068774932480",
	attachScreenshot: true,
	debug: false,
	tracesSampleRate: 1.0, // Adjust this value in production
	_experiments: {
		profilesSampleRate: 1.0, // Only during debugging, change to lower value in production
		replaysSessionSampleRate: 1.0, // Only during debugging, change to lower value in production
		replaysOnErrorSampleRate: 1,
	},
	integrations: [
		Sentry.mobileReplayIntegration({
			maskAllText: false,
			maskAllImages: true,
			maskAllVectors: false,
		}),
		Sentry.spotlightIntegration(),
		navigationIntegration,
	],
});

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
		},
	},
});

function RootLayout() {
	useReactQueryDevTools(queryClient);
	useMMKVDevTools({
		storage,
	});

	const ref = useNavigationContainerRef();

	useEffect(() => {
		navigationIntegration.registerNavigationContainer(ref);
	}, [ref]);

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

export default Sentry.wrap(RootLayout);

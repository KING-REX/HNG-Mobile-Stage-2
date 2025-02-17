import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { createContext, useContext, useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Create a context to store the font map
const FontContext = createContext<Record<string, Record<string, string>> | null>(null);

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		Urbanist_900: require("../assets/fonts/Urbanist-Black.ttf"),
		Urbanist_900Italic: require("../assets/fonts/Urbanist-BlackItalic.ttf"),
		Urbanist_800: require("../assets/fonts/Urbanist-ExtraBold.ttf"),
		Urbanist_800Italic: require("../assets/fonts/Urbanist-ExtraBoldItalic.ttf"),
		Urbanist_700: require("../assets/fonts/Urbanist-Bold.ttf"),
		Urbanist_700Italic: require("../assets/fonts/Urbanist-BoldItalic.ttf"),
		Urbanist_600: require("../assets/fonts/Urbanist-SemiBold.ttf"),
		Urbanist_600Italic: require("../assets/fonts/Urbanist-SemiBoldItalic.ttf"),
		Urbanist_500: require("../assets/fonts/Urbanist-Medium.ttf"),
		Urbanist_500Italic: require("../assets/fonts/Urbanist-MediumItalic.ttf"),
		Urbanist: require("../assets/fonts/Urbanist-Regular.ttf"),
		Urbanist_Italic: require("../assets/fonts/Urbanist-Italic.ttf"),
		Urbanist_300: require("../assets/fonts/Urbanist-Light.ttf"),
		Urbanist_300Italic: require("../assets/fonts/Urbanist-LightItalic.ttf"),
		Urbanist_200: require("../assets/fonts/Urbanist-ExtraLight.ttf"),
		Urbanist_200Italic: require("../assets/fonts/Urbanist-ExtraLightItalic.ttf"),
		Urbanist_100: require("../assets/fonts/Urbanist-Thin.ttf"),
		Urbanist_100Italic: require("../assets/fonts/Urbanist-ThinItalic.ttf"),
		ElsieSwashCaps: require("../assets/fonts/ElsieSwashCaps-Regular.ttf"),
		ElsieSwashCaps_900: require("../assets/fonts/ElsieSwashCaps-Black.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	// Define the font mappings
	const fontMap = {
		SpaceMono: {
			"400": "SpaceMono-Regular",
		},
		Urbanist: {
			"900": "Urbanist_900",
			"900Italic": "Urbanist_900Italic",
			"800": "Urbanist_800",
			"800Italic": "Urbanist_800Italic",
			"700": "Urbanist_700",
			"700Italic": "Urbanist_700Italic",
			"600": "Urbanist_600",
			"600Italic": "Urbanist_600Italic",
			"500": "Urbanist_500",
			"500Italic": "Urbanist_500Italic",
			"400": "Urbanist",
			"400Italic": "UrbanistItalic",
			"300": "Urbanist_300",
			"300Italic": "Urbanist_300Italic",
			"200": "Urbanist_200",
			"200Italic": "Urbanist_200Italic",
			"100": "Urbanist_100",
			"100Italic": "Urbanist_100Italic",
		},
		ElsieSwashCaps: {
			"900": "ElsieSwashCaps_900",
			"400": "ElsieSwashCaps",
		},
	};

	return (
		<FontContext.Provider value={fontMap}>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<Stack>
					<Stack.Screen name="index" options={{ headerShown: false }} />
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen name="country" options={{ headerShown: false }} />
					<Stack.Screen name="+not-found" />
				</Stack>
				<StatusBar style="auto" />
			</ThemeProvider>
		</FontContext.Provider>
	);
}

// Create a hook to access the fonts globally
export const useFontMap = () => {
	const context = useContext(FontContext);
	if (!context) {
		throw new Error("useFontMap must be used within a FontContext.Provider");
	}
	return context;
};

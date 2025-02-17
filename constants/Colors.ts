/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
	light: {
		text: "#1C1917",
		subText: "#667085",
		otherText: "#667085",
		exploreText: "#001637",
		background: "#FFFFFF",
		tint: tintColorLight,
		icon: "#1C1917",
		searchIcon: "#667085",
		tabIconDefault: "#687076",
		tabIconSelected: tintColorLight,
	},
	dark: {
		text: "#F2F4F7",
		subText: "#98A2B3",
		otherText: "#EAECF0",
		exploreText: "#EAECF0",
		background: "#000F24",
		tint: tintColorDark,
		icon: "#EAECF0",
		searchIcon: "#EAECF0",
		tabIconDefault: "#9BA1A6",
		tabIconSelected: tintColorDark,
	},
};

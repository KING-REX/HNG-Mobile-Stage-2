import { StyleSheet, TextInput as RNTextInput, TextInputProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { forwardRef } from "react";
import TextInput from "./TextInput";

export type ThemedTextInputProps = TextInputProps & {
	textLightColor?: string;
	textDarkColor?: string;
	bgLightColor?: string;
	bgDarkColor?: string;
	colorType?: "text" | "subText" | "exploreText" | "otherText";
};

export const ThemedTextInput = forwardRef<RNTextInput, ThemedTextInputProps>((props, ref) => {
	const { style, textLightColor, textDarkColor, bgLightColor, bgDarkColor, colorType = "text", ...rest } = props;
	const color = useThemeColor({ light: textLightColor, dark: textDarkColor }, colorType);
	const backgroundColor = useThemeColor({ light: bgLightColor, dark: bgDarkColor }, "background");

	return <TextInput ref={ref} placeholderTextColor={color} style={[{ color, backgroundColor }, style]} {...rest} />;
});

const styles = StyleSheet.create({
	default: {
		fontSize: 16,
		lineHeight: 24,
	},
	defaultSemiBold: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: "600",
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		lineHeight: 32,
	},
	subtitle: {
		fontSize: 20,
		fontWeight: "bold",
	},
	link: {
		lineHeight: 30,
		fontSize: 16,
		color: "#0a7ea4",
	},
});

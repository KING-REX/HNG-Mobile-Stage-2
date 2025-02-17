import { useFontMap } from "@/app/_layout";
import { Text as RNText, StyleSheet, TextProps, TextStyle } from "react-native";

export const refactorWeight = (weight?: string) => {
	switch (weight) {
		case "black":
			return "900";
		case "condensed":
		case "condensedBold":
			return "800";
		case "bold":
			return "700";
		case "heavy":
			return "600";
		case "semibold":
			return "500";
		case "regular":
		case "medium":
		case "normal":
			return "400";
		case "light":
			return "300";
		case "ultralight":
			return "200";
		case "thin":
			return "100";
		default:
			return "400";
	}
};

const getFontFamily = (fontMap: Record<string, Record<string, string>>, family: string, weight?: string | number, style?: string) => {
	let numericWeight = (typeof weight === "number" ? weight.toString() : weight) ?? "400";

	if (/^\d+$/.test(numericWeight)) {
		// testing if numericWeight is a number string
		return fontMap[family]?.[numericWeight] || fontMap[family]["400"];
	}

	numericWeight = refactorWeight(numericWeight);
	const fontKey = style === "italic" ? `${numericWeight}Italic` : numericWeight;
	return fontMap[family]?.[fontKey] || fontMap[family]["400"];
};

const Text = ({ style: rawStyle, ...props }: TextProps) => {
	const style = StyleSheet.flatten(rawStyle);
	const fontMap = useFontMap(); // Get fonts globally
	const { fontWeight, fontStyle, fontFamily } = (style || {}) as TextStyle;
	const completedStyle = [
		style,
		{
			fontWeight: undefined,
			fontStyle: undefined,
			fontFamily: getFontFamily(fontMap, fontFamily ?? "Urbanist", fontWeight, fontStyle),
		},
	];

	return (
		<RNText
			{...props}
			style={[
				style,
				{
					fontFamily: getFontFamily(fontMap, fontFamily ?? "Urbanist", fontWeight, fontStyle),
				},
			]}
		/>
	);
};

export default Text;

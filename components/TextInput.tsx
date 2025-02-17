import { useFontMap } from "@/app/_layout";
import { TextInput as RNTextInput, StyleSheet, TextInputProps, TextStyle } from "react-native";
import { refactorWeight } from "./Text";
import { forwardRef } from "react";

const getFontFamily = (fontMap: Record<string, Record<string, string>>, family: string, weight?: string | number, style?: string) => {
	let numericWeight = (typeof weight === "number" ? weight.toString() : weight) ?? "400";

	if (/^\d+$/.test(numericWeight)) {
		// testing if numericWeight is a number string
		return fontMap[family]?.[numericWeight] || fontMap[family]["400"];
	}

	numericWeight = refactorWeight(numericWeight);
	const fontKey = style === "italic" ? `${numericWeight}italic` : numericWeight;
	return fontMap[family]?.[fontKey] || fontMap[family]["400"];
};

const TextInput = forwardRef<RNTextInput, TextInputProps>((props, ref) => {
	const { style: rawStyle, ...rest } = props;
	const style = StyleSheet.flatten(rawStyle);
	const fontMap = useFontMap(); // Get fonts globally
	const { fontWeight, fontStyle, fontFamily } = (style || {}) as TextStyle;

	return (
		<RNTextInput
			{...rest}
			ref={ref}
			style={[
				style,
				{
					fontFamily: getFontFamily(fontMap, fontFamily ?? "Urbanist", fontWeight, fontStyle),
				},
			]}
		/>
	);
});

export default TextInput;

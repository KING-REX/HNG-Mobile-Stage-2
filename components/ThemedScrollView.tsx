import { ScrollView, ScrollViewProps, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useThemeColor } from "@/hooks/useThemeColor";

type ThemedScrollViewProps = ScrollViewProps & {
	lightColor?: string;
	darkColor?: string;
};

const ThemedScrollView = ({ style, lightColor, darkColor, ...otherProps }: ThemedScrollViewProps) => {
	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

	return <ScrollView style={[{ backgroundColor }, style]} {...otherProps} />;
};

export default ThemedScrollView;

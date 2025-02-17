import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";

type ThemedSafeAreaViewProps = SafeAreaViewProps & {
	lightColor?: string;
	darkColor?: string;
};

const ThemedSafeAreaView = ({ style, lightColor, darkColor, ...otherProps }: ThemedSafeAreaViewProps) => {
	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

	return <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />;
};

export default ThemedSafeAreaView;

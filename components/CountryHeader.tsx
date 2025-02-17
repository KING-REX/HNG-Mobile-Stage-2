import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import { router, Stack } from "expo-router";
import { ThemedText } from "./ThemedText";

const CountryHeader = ({ title }: { title?: string }) => {
	const { icon: iconColor } = useCurrentTheme();
	return (
		<ThemedView style={styles.container}>
			<TouchableWithoutFeedback>
				<Ionicons name="arrow-back" color={iconColor} size={24} onPress={() => router.back()} />
			</TouchableWithoutFeedback>
			<ThemedText style={styles.title}>{title}</ThemedText>
		</ThemedView>
	);
};

export default CountryHeader;

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		flexDirection: "row",
		alignItems: "center",
		marginTop: 30,
		marginBottom: 20,
	},
	title: {
		flex: 1,
		fontSize: 24,
		textAlign: "center",
		fontWeight: "700",
	},
});

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { } from 'expo-image';
import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Image } from "expo-image";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";

type CountryPreviewProps = {
	flag: string;
	name: string;
	capital: string;
	onPress?: () => void;
};

const CountryPreview = ({ flag, name, capital, onPress: handlePress }: CountryPreviewProps) => {
	const { icon: borderColor } = useCurrentTheme();
	return (
		<TouchableOpacity style={styles.container} onPress={handlePress}>
			<ThemedView style={styles.flagContainer}>
				<Image source={flag} style={styles.flag} />
			</ThemedView>
			<View>
				<ThemedText style={styles.title}>{name}</ThemedText>
				<ThemedText style={styles.subtitle} colorType="subText">
					{capital}
				</ThemedText>
			</View>
		</TouchableOpacity>
	);
};

export default CountryPreview;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 12,
		paddingVertical: 10,
		// backgroundColor: "#f0f",
	},
	flagContainer: {
		width: 50,
		height: 50,
		borderRadius: 10,
		borderWidth: 0.5,
		borderColor: "#A9B8D4",
		overflow: "hidden",
	},
	flag: {
		flex: 1,
	},
	title: {},
	subtitle: {
		fontSize: 14,
	},
});

import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { CountryInfo } from ".";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import { ThemedView } from "@/components/ThemedView";
import { Circle } from "react-native-animated-spinkit";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import CountryHeader from "@/components/CountryHeader";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTheme } from "@react-navigation/native";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import { Image } from "expo-image";
import CountryInformation from "@/components/CountryInformation";
import { Entypo } from "@expo/vector-icons";

const Country = () => {
	const { cca3 } = useLocalSearchParams<{ cca3: string }>();

	const [country, setCountry] = useState<CountryInfo>();
	const [loading, setLoading] = useState(true);
	const [loaded, setLoaded] = useState(false);

	const { icon: iconColor } = useCurrentTheme();

	const [activeIndex, setActiveIndex] = useState(0);

	const increaseIndex = () => {
		if (activeIndex === 2) setActiveIndex(0);
		else setActiveIndex(activeIndex + 1);
	};

	const reduceIndex = () => {
		if (activeIndex === 0) setActiveIndex(2);
		else setActiveIndex(activeIndex - 1);
	};

	useEffect(() => {
		fetch(`https://restcountries.com/v3.1/alpha/${cca3}`)
			.then((response) => response.json())
			.then((data: CountryInfo[] | undefined) => {
				setCountry(data && data[0]);
				setTimeout(() => {
					setLoading(false);
					setLoaded(true);
				}, 5000); // Just so you can see the spinner lmao
			})
			.catch((error) => {
				console.error("Error fetching countries:", error);
				setLoading(false);
			});
	}, []);

	return (
		<ThemedSafeAreaView style={styles.container}>
			{!loaded && loading && (
				<ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<Circle size={56} color={iconColor} style={{ marginTop: -60 }} />
				</ThemedView>
			)}
			{!loaded && !loading && (
				<ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<ThemedText style={{ textAlign: "center" }}>Error while fetching country list 😢</ThemedText>
				</ThemedView>
			)}
			{!loading && loaded && (
				<ThemedView>
					<CountryHeader title={country?.name.common} />
					<ThemedView style={styles.imageContainer}>
						<View style={styles.buttonContainer}>
							<TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={reduceIndex}>
								<Entypo name="chevron-small-left" size={20} color={Colors["dark"]["icon"]} />
							</TouchableOpacity>
							<TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={increaseIndex}>
								<Entypo name="chevron-small-right" size={20} color={Colors["dark"]["icon"]} />
							</TouchableOpacity>
						</View>
						{activeIndex === 0 && <Image source={country?.flags.png} style={styles.image} />}
						{activeIndex === 1 && <Image source={country?.coatOfArms.png} style={styles.image} contentFit="contain" />}
						{activeIndex === 2 && <Image source={country?.maps.googleMaps} style={styles.image} />}
						<View style={styles.indicatorContainer}>
							<View style={[styles.indicator, activeIndex === 0 && styles.activeIndicator]}></View>
							<View style={[styles.indicator, activeIndex === 1 && styles.activeIndicator]}></View>
							<View style={[styles.indicator, activeIndex === 2 && styles.activeIndicator]}></View>
						</View>
					</ThemedView>
					<CountryInformation country={country} />
				</ThemedView>
			)}
		</ThemedSafeAreaView>
	);
};

export default Country;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24,
		paddingBottom: 20,
	},
	imageContainer: {
		width: "100%",
		height: 200,
		borderRadius: 10,
		borderWidth: 0.5,
		borderColor: "#A9B8D4",
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "100%",
		objectFit: "scale-down",
	},
	buttonContainer: {
		position: "absolute",
		zIndex: 99,
		top: "50%",
		transform: [{ translateY: "-50%" }],
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		paddingHorizontal: 24,
	},
	button: {
		padding: 6,
		borderRadius: "100%",
		backgroundColor: Colors["dark"]["text"] + "4D",
		borderWidth: 0.5,
		borderColor: "#A9B8D4",
		// opacity: 0.3,
	},
	indicatorContainer: {
		position: "absolute",
		bottom: 24,
		left: "50%",
		transform: [{ translateX: "-50%" }],
		flexDirection: "row",
		gap: 2,
	},
	indicator: {
		width: 6,
		height: 6,
		backgroundColor: "#999999",
		borderRadius: "100%",
		borderWidth: 0.5,
		borderColor: "#A9B8D4",
	},
	activeIndicator: {
		backgroundColor: "#EAECF0",
	},
});

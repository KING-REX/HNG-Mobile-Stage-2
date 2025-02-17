import { StyleSheet, TouchableOpacity, useColorScheme, Appearance, TextInput as RNTextInput, View, NativeSyntheticEvent } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import ThemedScrollView from "@/components/ThemedScrollView";
import ThemedSafeAreaView from "@/components/ThemedSafeAreaView";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { Colors } from "@/constants/Colors";
import { useCallback, useEffect, useRef, useState } from "react";
import { Circle } from "react-native-animated-spinkit";
import CountryPreview from "@/components/CountryPreview";
import { router } from "expo-router";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetHandle, BottomSheetView } from "@gorhom/bottom-sheet";
import { ThemedBottomSheetView } from "@/components/ThemedBottomSheetView";
import { useSharedValue } from "react-native-reanimated";
import FilterBottomSheet from "@/components/FilterBottomSheet";
import { TextInputChangeEventData } from "react-native";

export interface CountryPreview {
	name: {
		common: string;
		official: string;
		nativeName: {
			[key: string]: {};
		};
	};
	capital: string;
	flags: {
		png: string;
		svg: string;
	};
	cca3: string;
	timezones: string[];
	continents: string[];
}

export interface CountryInfo {
	name: {
		common: string;
		official: string;
		nativeName: {
			[key: string]: {};
		};
	};
	state?: string;
	flag: string;
	population: number;
	capital: string;
	continents: string[];
	tld: string[];
	cca2: string;
	cca3: string;
	independent: boolean;
	status: string;
	unMember: boolean;
	currencies: Record<string, { name: string; symbol: string }>;
	idd: Record<string, { root: string; suffixes: string[] }>;
	altSpellings: string[];
	region: string;
	subregion: string;
	languages: Record<string, string>;
	translations: Record<string, { official: string; common: string }>;
	latlng: [number, number];
	landlocked: boolean;
	area: number;
	denonyms: Record<string, { f: string; m: string }>;
	maps: {
		googleMaps: string;
		openStreetMaps: string;
	};
	car: {
		signs: string[];
		side: string;
	};
	flags: {
		png: string;
		svg: string;
	};
	timezones: string[];
	coatOfArms: {
		png: string;
		svg: string;
	};
	startOfWeek: string;
	capitalInfo: {
		latlng: [number, number];
	};
}

export default function HomeScreen() {
	const colorScheme = useColorScheme();
	const { icon: iconColor, searchIcon: searchIconColor } = useCurrentTheme();
	const toggleColorScheme = () => {
		Appearance.setColorScheme(colorScheme === "dark" ? "light" : "dark");
	};

	const searchInputRef = useRef<RNTextInput>(null);
	const handleSearchIconPress = () => {
		searchInputRef?.current?.focus();
	};

	const [countries, setCountries] = useState<CountryPreview[]>([]);
	const [filteredCountries, setFilteredCountries] = useState<CountryPreview[]>([]);
	const [loading, setLoading] = useState(true);
	const [loaded, setLoaded] = useState(false);
	const handleCountrySelect = (cca3: CountryPreview["cca3"]) => {
		router.push({ pathname: "/country", params: { cca3 } });
	};
	const [currentFilterConditions, setCurrentFilterConditions] = useState<{ continents: string[]; timezones: string[] }>({ continents: [], timezones: [] });

	const handleFilter = (continents: string[], timezones: string[]) => {
		setCurrentFilterConditions({ continents, timezones });
		let meetsCondition = false;
		const newlyFilteredCountries = countries.filter((country) => {
			if (continents.length === 0 && timezones.length === 0) return true;
			for (let i = 0; i < continents.length; i++) {
				const continent = continents[i];
				meetsCondition = country.continents.includes(continent);
				if (meetsCondition) console.log(country.name.common);
				if (meetsCondition === true) return true;
			}
			for (let i = 0; i < timezones.length; i++) {
				const timezone = timezones[i];
				meetsCondition = country.timezones.includes(timezone);
				if (meetsCondition) console.log(country.name.common);
				if (meetsCondition === true) return true;
			}
			return false;
		});
		setFilteredCountries(newlyFilteredCountries);
	};

	const handleSearchFilter = (searchString: string) => {
		console.log(`Text changed to: ${searchString}`);
		const newlyFilteredCountries = filteredCountries.filter((country) => country.name.common.includes(searchString));
		setFilteredCountries(newlyFilteredCountries);
	};

	useEffect(() => {
		fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags,cca3,timezones,continents")
			.then((response) => response.json())
			.then((data: any[]) => {
				// Sort countries alphabetically by common name
				const sorted = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
				setCountries(sorted);
				setFilteredCountries(sorted);
				// console.log();
				// console.log();
				// data &&
				// 	data.forEach((datum) => {
				// 		console.log(datum["continents"]);
				// 	});
				// console.log();
				// console.log();
				setLoading(false);
				setLoaded(true);
				// setTimeout(() => {
				// 	setLoading(false);
				// 	setLoaded(true);
				// }, 5000); // Just so you can see the spinner lmao
			})
			.catch((error) => {
				console.error("Error fetching countries:", error);
				setLoading(false);
			});
	}, []);

	const [shouldOpenFilterBottomSheet, setShouldOpenFilterBottomSheet] = useState(false);
	const [shouldOpenTranslationBottomSheet, setShouldOpenTranslationBottomSheet] = useState(false);

	return (
		<GestureHandlerRootView style={styles.ghrv}>
			<ThemedSafeAreaView style={styles.container}>
				<ThemedView style={styles.nav}>
					<ThemedText style={styles.logoText} colorType="exploreText">
						Explore
						<ThemedText style={[styles.logoText, styles.logoFullstop]}>.</ThemedText>
					</ThemedText>
					<TouchableOpacity activeOpacity={1} style={styles.themeSwitchButton} onPress={toggleColorScheme}>
						<Ionicons name={colorScheme === "dark" ? "moon-outline" : "sunny-outline"} size={28} color={iconColor} />
					</TouchableOpacity>
				</ThemedView>

				<ThemedView style={styles.searchBar} lightColor="#F2F4F7" darkColor="#1E2C41">
					<TouchableOpacity activeOpacity={1} style={styles.searchIconContainer} onPress={handleSearchIconPress}>
						<Ionicons name="search" size={22} color={searchIconColor} />
					</TouchableOpacity>
					<ThemedTextInput
						ref={searchInputRef}
						style={styles.searchInput}
						placeholder="Search Country"
						bgLightColor="transparent"
						bgDarkColor="transparent"
						colorType="otherText"
						onChangeText={handleSearchFilter}
					/>
				</ThemedView>

				<ThemedView style={styles.filterContainer}>
					<TouchableOpacity activeOpacity={0.6}>
						<ThemedView style={styles.filterItem}>
							<SimpleLineIcons name="globe" size={24} color={iconColor} />
							<ThemedText style={styles.filterItemText}>EN</ThemedText>
						</ThemedView>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.6} onPress={() => setShouldOpenFilterBottomSheet(true)}>
						<ThemedView style={styles.filterItem}>
							<AntDesign name="filter" size={24} color={iconColor} />
							<ThemedText style={styles.filterItemText}>Filter</ThemedText>
						</ThemedView>
					</TouchableOpacity>
				</ThemedView>
				<ThemedScrollView style={styles.scrollableContainer} showsVerticalScrollIndicator={false}>
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
					{!loading &&
						loaded &&
						filteredCountries.map((country, _) => (
							<CountryPreview
								key={_ + "" + Date.now()}
								flag={country.flags.png}
								name={country.name.common}
								capital={country.capital}
								onPress={() => handleCountrySelect(country.cca3)}
							/>
						))}
				</ThemedScrollView>

				{shouldOpenFilterBottomSheet && (
					<FilterBottomSheet
						shouldOpen={shouldOpenFilterBottomSheet}
						onClose={() => setShouldOpenFilterBottomSheet(false)}
						onFilter={handleFilter}
						currentFilterConditions={currentFilterConditions}
					/>
				)}
			</ThemedSafeAreaView>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	ghrv: {
		flex: 1,
	},
	container: {
		flex: 1,
		paddingHorizontal: 24,
		paddingBottom: 20,
	},
	nav: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 30,
	},
	logoText: {
		// alignSelf: "flex-end",
		fontSize: 24,
		fontFamily: "ElsieSwashCaps",
		fontWeight: "black",
		letterSpacing: 0.4,
	},
	logoFullstop: {
		color: "#FF6C00",
	},
	themeSwitchButton: {
		// backgroundColor: "#ff0",
		borderRadius: 5,
		padding: 8,
	},
	searchBar: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 30,
		borderRadius: 5,
	},
	searchIconContainer: {
		// backgroundColor: "#ff0",
		paddingHorizontal: 15,
		paddingVertical: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	searchInput: {
		flex: 1,
		textAlign: "center",
		fontSize: 18,
	},
	filterContainer: {
		justifyContent: "space-between",
		flexDirection: "row",
		marginTop: 20,
		marginBottom: 10,
	},
	filterItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		paddingHorizontal: 14,
		paddingVertical: 10,
		borderWidth: 0.2,
		borderColor: "#A9B8D4",
		borderRadius: 5,
	},
	filterItemText: { fontSize: 14 },

	scrollableContainer: {
		flex: 1,
	},
});

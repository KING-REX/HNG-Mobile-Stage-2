import { DimensionValue, LayoutChangeEvent, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { useSharedValue } from "react-native-reanimated";
import { ThemedBottomSheetView } from "./ThemedBottomSheetView";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { AntDesign, Entypo, Feather, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import { continents, timezones } from "@/constants/FilterOptions";
import ThemedScrollView from "./ThemedScrollView";

const FilterBackdrop = (props: BottomSheetBackdropProps) => {
	return <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />;
};

type FilterBottomSheetProps = {
	shouldOpen?: boolean;
	onClose?: () => void;
	onFilter?: (continents: string[], timezones: string[]) => void;
	currentFilterConditions?: { continents: string[]; timezones: string[] };
};

const FilterBottomSheet = ({ shouldOpen = false, onClose, onFilter, currentFilterConditions }: FilterBottomSheetProps) => {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const handleSheetChanges = (index: number) => {
		if (index === -1) onClose && onClose();
		console.log("handleSheetChanges", index);
	};
	const [initialIndex, setInitialIndex] = useState(0);

	const { icon: iconColor, text: textColor, background: backgroundColor } = useCurrentTheme();
	const { icon: reverseIconColor } = useCurrentTheme(true);
	const colorScheme = useColorScheme();

	const [selectedContinents, setSelectedContinents] = useState<string[]>([]);
	const [isContinentActive, setIsContinentActive] = useState(false);
	const handleContinentPress = () => {
		setIsContinentActive(!isContinentActive);
	};

	const [selectedTimezones, setSelectedTimezones] = useState<string[]>([]);
	const [isTimezoneActive, setIsTimezoneActive] = useState(false);
	const handleTimezonePress = () => {
		setIsTimezoneActive(!isTimezoneActive);
	};
	const [timezoneHeight, setTimezoneHeight] = useState<DimensionValue>("58%");
	useEffect(() => {
		if (currentFilterConditions?.continents) setSelectedContinents(currentFilterConditions.continents);
		if (currentFilterConditions?.timezones) setSelectedTimezones(currentFilterConditions.timezones);
	}, [currentFilterConditions]);

	const closeBottomSheet = () => {
		// onClose && onClose();
		bottomSheetRef.current?.close();
	};

	const handleShowResults = () => {
		onFilter && onFilter(selectedContinents, selectedTimezones);
		closeBottomSheet();
	};

	useEffect(() => {
		if (isContinentActive && !isTimezoneActive) bottomSheetRef.current?.snapToIndex(1);
		else if (!isContinentActive && isTimezoneActive) {
			setTimezoneHeight("58%");
			bottomSheetRef.current?.snapToIndex(2);
		} else if (isContinentActive && isTimezoneActive) {
			setTimezoneHeight("30%");
			bottomSheetRef.current?.snapToIndex(3);
		} else bottomSheetRef.current?.snapToIndex(0);
	}, [isContinentActive, isTimezoneActive]);

	useEffect(() => {
		if (shouldOpen) setInitialIndex(0);
		// else bottomSheetRef.current?.close();
	}, [shouldOpen]);

	return (
		<BottomSheet
			ref={bottomSheetRef}
			onChange={handleSheetChanges}
			enableContentPanningGesture={false}
			enableHandlePanningGesture={false}
			backgroundComponent={null}
			handleComponent={null}
			index={initialIndex}
			backdropComponent={FilterBackdrop}
			enableDynamicSizing={false}
			snapPoints={["22%", "62%", "63%", "86%"]}
			style={[styles.bottomSheetContainer, { backgroundColor }]}
		>
			<ThemedView style={styles.heading}>
				<ThemedText style={styles.headingText}>Filter</ThemedText>
				<TouchableOpacity style={styles.closeButton} onPress={closeBottomSheet}>
					<AntDesign name="close" color="#98A2B3" size={12} />
				</TouchableOpacity>
			</ThemedView>
			<ThemedView style={styles.content}>
				<ThemedView style={styles.filterOptionsContainer}>
					<TouchableOpacity style={styles.filterOptionHeading} onPress={handleContinentPress}>
						<ThemedText style={styles.filterOptionHeadingText}>Continent</ThemedText>
						<Entypo name={`chevron-small-${isContinentActive ? "up" : "down"}`} color={iconColor} size={24} />
					</TouchableOpacity>
					{isContinentActive && (
						<ThemedView style={styles.filterOptions}>
							{continents.map((continent, index) => (
								<TouchableOpacity
									key={index}
									activeOpacity={8}
									style={styles.filterOption}
									onPress={() => {
										if (!selectedContinents.includes(continent)) setSelectedContinents(selectedContinents.concat(continent));
										else setSelectedContinents(selectedContinents.filter((array_continent) => continent !== array_continent));
									}}
								>
									<ThemedText>{continent}</ThemedText>
									<ThemedView
										style={[
											styles.checkbox,
											{ borderColor: iconColor },
											selectedContinents.includes(continent) && { backgroundColor: iconColor },
										]}
									>
										{selectedContinents.includes(continent) && <FontAwesome name="check" color={reverseIconColor} size={10} />}
									</ThemedView>
								</TouchableOpacity>
							))}
						</ThemedView>
					)}
				</ThemedView>
				<ThemedView style={styles.filterOptionsContainer}>
					<TouchableOpacity style={styles.filterOptionHeading} onPress={handleTimezonePress}>
						<ThemedText style={styles.filterOptionHeadingText}>Timezone</ThemedText>
						<Entypo name={`chevron-small-${isTimezoneActive ? "up" : "down"}`} color={iconColor} size={24} />
					</TouchableOpacity>
					{isTimezoneActive && (
						<ThemedScrollView
							style={[styles.filterOptions, styles.scrollableFilterOptions, { height: timezoneHeight }]}
							showsVerticalScrollIndicator={false}
						>
							{timezones.map((timezone, index) => (
								<TouchableOpacity
									key={index}
									activeOpacity={8}
									style={styles.filterOption}
									onPress={() => {
										if (!selectedTimezones.includes(timezone)) setSelectedTimezones(selectedTimezones.concat(timezone));
										else setSelectedTimezones(selectedTimezones.filter((array_timezone) => timezone !== array_timezone));
									}}
								>
									<ThemedText>{timezone}</ThemedText>
									<ThemedView
										style={[
											styles.checkbox,
											{ borderColor: iconColor },
											selectedTimezones.includes(timezone) && { backgroundColor: iconColor },
										]}
									>
										{selectedTimezones.includes(timezone) && <FontAwesome name="check" color={reverseIconColor} size={10} />}
									</ThemedView>
								</TouchableOpacity>
							))}
						</ThemedScrollView>
					)}
				</ThemedView>
				{(isContinentActive || isTimezoneActive) && (
					<ThemedView style={styles.actionContainer}>
						<TouchableOpacity
							activeOpacity={0.8}
							style={[styles.action, styles.resetAction, { borderColor: textColor }]}
							onPress={() => {
								setSelectedContinents([]);
								setSelectedTimezones([]);
								setIsContinentActive(false);
								setIsTimezoneActive(false);
							}}
						>
							<ThemedText>Reset</ThemedText>
						</TouchableOpacity>
						<TouchableOpacity
							activeOpacity={0.8}
							style={[styles.action, styles.resultsAction, { backgroundColor: "#FF6C00" + (colorScheme === "dark" ? "CC" : "") }]}
							onPress={handleShowResults}
						>
							<ThemedText style={styles.resultsActionText}>Show Results</ThemedText>
						</TouchableOpacity>
					</ThemedView>
				)}
			</ThemedView>
		</BottomSheet>
	);
};

export default FilterBottomSheet;

const styles = StyleSheet.create({
	bottomSheetContainer: {
		paddingTop: 30,
		alignItems: "center",
		borderTopLeftRadius: 48,
		borderTopRightRadius: 48,
		// backgroundColor: "#555",
		paddingHorizontal: 24,
		gap: 12,
	},
	heading: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	headingText: {
		fontWeight: 700,
		fontSize: 20,
	},
	closeButton: {
		padding: 4,
		backgroundColor: "#98A2B3" + "66",
		borderRadius: 5,
	},
	content: {
		width: "100%",
	},
	filterOptionsContainer: {
		// gap: 10,
	},
	filterOptionHeading: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 10,
		// backgroundColor: "#ff0",
	},
	filterOptionHeadingText: {
		fontWeight: 700,
	},
	filterOptions: {
		// gap: 20,
	},
	scrollableFilterOptions: {},
	filterOption: {
		paddingVertical: 8,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		// backgroundColor: "#f0f",
	},
	checkbox: {
		height: 20,
		width: 20,
		borderRadius: 5,
		borderWidth: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	actionContainer: {
		flexDirection: "row",
		// justifyContent: "space-between",
		gap: 48,
		// backgroundColor: "#0f0",
	},
	action: {
		paddingVertical: 12,
		borderRadius: 5,
		textAlign: "center",
	},
	resetAction: {
		paddingHorizontal: 24,
		borderWidth: 1,
	},
	resultsAction: {
		flex: 1,
	},
	resultsActionText: {
		color: "#FDFDFC",
		textAlign: "center",
	},
});

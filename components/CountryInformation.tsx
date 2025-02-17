import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { CountryInfo } from "@/app";

const CountryInformation = ({ country }: { country?: CountryInfo }) => {
	// console.log();
	// console.log();
	// console.log("Currencies:");
	// console.log(country?.currencies);
	// console.log();
	// console.log();
	const getCurrencies = () => {
		let currencyStr = "";
		const currencyArr = Object.values(country?.currencies ?? {});
		currencyArr.forEach((currency, _) => {
			if (_ === 0) currencyStr += currency.name;
			else currencyStr += `, ${currency.name}`;
		});
		return currencyStr;
	};
	const getDrivingSide = () => {
		const side = country?.car.side;
		const sideStr = side ? side.charAt(0).toUpperCase() + side.substring(1) : "Right";
		return sideStr;
	};
	const getLanguages = () => {
		let languagesStr = "";
		const languagesArr = Object.values(country?.languages ?? {});
		languagesArr.forEach((language, _) => {
			languagesStr += `${_ !== 0 ? ", " : ""}${language}`;
		});
		return languagesStr;
	};
	const getTimezones = () => {
		let timezonesStr = "";
		const timezonesArr = country?.timezones ?? [];
		timezonesArr.forEach((timezone, _) => {
			timezonesStr += `${_ !== 0 ? ", " : ""}${timezone}`;
		});
		return timezonesStr;
	};
	const getLatlng = () => {
		let latlngStr = "";
		country?.latlng.forEach((latlng, _) => {
			latlngStr += `${_ !== 0 ? ", " : ""}${latlng}`;
		});
		return latlngStr;
	};
	const getTlds = () => {
		let tldStr = "";
		country?.tld.forEach((tld, _) => {
			tldStr += `${_ !== 0 ? ", " : ""}${tld}`;
		});
		return tldStr;
	};
	const getContinents = () => {
		let continentStr = "";
		country?.continents.forEach((continent, _) => {
			continentStr += `${_ !== 0 ? ", " : ""}${continent}`;
		});
		return continentStr;
	};

	return (
		<ThemedView style={styles.container}>
			<ThemedView style={styles.sections}>
				<ThemedView style={styles.content}>
					<ThemedText style={styles.heading}>Capital:</ThemedText>
					<ThemedText style={styles.subheading}>{country?.capital}</ThemedText>
				</ThemedView>
				<ThemedView style={styles.content}>
					<ThemedText style={styles.heading}>Population:</ThemedText>
					<ThemedText style={styles.subheading}>{country?.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</ThemedText>
				</ThemedView>
				<ThemedView style={styles.content}>
					<ThemedText style={styles.heading}>Continent(s):</ThemedText>
					<ThemedText style={styles.subheading}>{getContinents()}</ThemedText>
				</ThemedView>
				<ThemedView style={styles.content}>
					<ThemedText style={styles.heading}>Subregion:</ThemedText>
					<ThemedText style={styles.subheading}>{country?.subregion}</ThemedText>
				</ThemedView>
			</ThemedView>
			<ThemedView style={styles.sections}>
				<ThemedView style={styles.content}>
					<ThemedText style={styles.heading}>Independent?:</ThemedText>
					<ThemedText style={styles.subheading}>{country?.independent ? "Yes" : "No"}</ThemedText>
				</ThemedView>
				<ThemedView style={styles.content}>
					<ThemedText style={styles.heading}>Language(s):</ThemedText>
					<ThemedText style={styles.subheading}>{getLanguages()}</ThemedText>
				</ThemedView>
				<ThemedView style={styles.content}>
					<ThemedText style={styles.heading}>Top Level Domain(s):</ThemedText>
					<ThemedText style={styles.subheading}>{getTlds()}</ThemedText>
				</ThemedView>
				<ThemedView style={styles.content}>
					<ThemedText style={styles.heading}>Is a member of UN:</ThemedText>
					<ThemedText style={styles.subheading}>{country?.unMember ? "Yes" : "No"}</ThemedText>
				</ThemedView>
			</ThemedView>
			<ThemedView style={styles.sections}>
				<ThemedView style={styles.content}>
					<ThemedText style={styles.heading}>Area:</ThemedText>
					<ThemedText style={styles.subheading}>{country?.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} km²</ThemedText>
				</ThemedView>
				<ThemedView style={styles.content}>
					<ThemedText style={styles.heading}>LatLng:</ThemedText>
					<ThemedText style={styles.subheading}>{getLatlng()}</ThemedText>
				</ThemedView>
				<ThemedView style={styles.content}>
					<ThemedText style={styles.heading}>Currency:</ThemedText>
					<ThemedText style={styles.subheading}>{getCurrencies()}</ThemedText>
				</ThemedView>
				<ThemedView style={styles.content}>
					<ThemedText style={styles.heading}>Landlocked?:</ThemedText>
					<ThemedText style={styles.subheading}>{country?.landlocked ? "Yes" : "No"}</ThemedText>
				</ThemedView>
			</ThemedView>
			<ThemedView style={styles.sections}>
				<ThemedView style={styles.content}>
					<ThemedText style={styles.heading}>Timezone(s):</ThemedText>
					<ThemedText style={styles.subheading}>{getTimezones()}</ThemedText>
				</ThemedView>
				<ThemedView style={styles.content}>
					<ThemedText style={styles.heading}>Start of week:</ThemedText>
					<ThemedText style={styles.subheading}>
						{country && country.startOfWeek.charAt(0).toUpperCase() + country.startOfWeek.substring(1)}
					</ThemedText>
				</ThemedView>
				<ThemedView style={styles.content}>
					<ThemedText style={styles.heading}>Status:</ThemedText>
					<ThemedText style={styles.subheading}>{country && country.status.charAt(0).toUpperCase() + country.status.substring(1)}</ThemedText>
				</ThemedView>
				<ThemedView style={styles.content}>
					<ThemedText style={styles.heading}>Driving side:</ThemedText>
					<ThemedText style={styles.subheading}>{getDrivingSide()}</ThemedText>
				</ThemedView>
			</ThemedView>
		</ThemedView>
	);
};

export default CountryInformation;

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		gap: 24,
	},
	sections: {},
	content: {
		flexDirection: "row",
		gap: 8,
	},
	heading: {
		fontWeight: 500,
		fontFamily: "Urbanist",
	},
	subheading: {
		fontWeight: 200,
	},
});

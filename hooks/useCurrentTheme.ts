import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

export function useCurrentTheme(reverse?: boolean) {
	const theme = useColorScheme() ?? "light";
	if (reverse) {
		if (theme === "dark") return Colors["light"];
		else return Colors["dark"];
	}

	return Colors[theme];
}

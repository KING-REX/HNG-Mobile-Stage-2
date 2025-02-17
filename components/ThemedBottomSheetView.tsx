import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { BottomSheetView } from "@gorhom/bottom-sheet";

export type ThemedBottomSheetViewProps = ViewProps & {
	lightColor?: string;
	darkColor?: string;
};

export function ThemedBottomSheetView({ style, children, lightColor, darkColor, ...otherProps }: ThemedBottomSheetViewProps) {
	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

	return (
		<BottomSheetView style={[{ backgroundColor }, style]} {...otherProps}>
			{children}
		</BottomSheetView>
	);
}

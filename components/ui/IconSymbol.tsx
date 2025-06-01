// Fallback for using MaterialIcons on Android and web.

import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolViewProps } from "expo-symbols";
import { ComponentProps } from "react";

type IconMapping = Record<SymbolViewProps["name"], ComponentProps<typeof MaterialIcons>["name"]>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
	"house.fill": "home",
	"paperplane.fill": "send",
	"chevron.left.forwardslash.chevron.right": "code",
	"chevron.right": "chevron-right",
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({ name, size = 24, color = "#000" }: { name: string; size?: number; color?: string }) {
	// You can switch based on your icon name
	switch (name) {
		case "house.fill":
			return <FontAwesome name="home" size={size} color={color} />;
		case "magnifyingglass":
			return <Feather name="search" size={size} color={color} />;
		case "person.fill":
			return <Ionicons name="person" size={size} color={color} />;
		default:
			return <MaterialIcons name="help-outline" size={size} color={color} />;
	}
}

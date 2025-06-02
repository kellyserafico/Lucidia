import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarStyle: {
					backgroundColor: "#22155E",
					borderTopWidth: 0,
					height: 80,
					paddingBottom: 18,
					paddingTop: 10,
					elevation: 12,
				}, 
				tabBarLabelStyle: {
					fontSize: 10,
					paddingBottom: 4,
				},
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => <IconSymbol size={24} name="house.fill" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: "Search",
					tabBarIcon: ({ color }) => <IconSymbol size={24} name="magnifyingglass" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="account"
				options={{
					title: "Account",
					tabBarIcon: ({ color }) => <IconSymbol size={24} name="person.fill" color={color} />,
				}}
			/>
		</Tabs>
	);
}

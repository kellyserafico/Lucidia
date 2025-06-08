import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEntries } from "../contexts/EntriesContext";

export default function EntryViewScreen() {
	const router = useRouter();
	const { id } = useLocalSearchParams();

	const { entries } = useEntries();
	const emptyEntry = {
		id: "N/A",
		date: "N/A",
		dayTime: "N/A",
		mood: "N/A",
		tags: [],
		text: "Entry does not exist",
	};
	const entry = entries.find(entry => entry.id === id) ?? emptyEntry;

	return (
		<LinearGradient colors={["rgba(72, 52, 169, 0.75)", "rgba(69, 72, 166, 0.75)"]} style={{ flex: 1 }}>
			<SafeAreaView style={styles.container}>
				<TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
					<Ionicons name="chevron-back" size={32} color="#fff" />
				</TouchableOpacity>

				<Text style={styles.date}>{entry.date}</Text>
				<Text style={styles.dayTime}>{entry.dayTime}</Text>

				<View style={styles.entryDetailsContainer}>
					<View style={styles.moodContainer}>
						<Text style={styles.mood}>{entry.mood}</Text>
						<TouchableOpacity onPress={() => router.push({ pathname: "/edit/[id]", params: { id: entry.id } })}>
							<Feather name="edit-2" size={22} color="#fff" />
						</TouchableOpacity>
					</View>
					<View style={styles.tagsContainer}>
						{entry.tags.map((tag, index) => (
							<View key={index} style={styles.tag}>
								<Text style={styles.tagText}>{tag.label}</Text>
							</View>
						))}
					</View>
					<View style={styles.divider} />
					<Text style={styles.dreamText}>{entry.text}</Text>
				</View>
			</SafeAreaView>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 24,
	},
	backBtn: {
		marginBottom: 12,
		marginLeft: 2,
		width: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "flex-start",
		paddingHorizontal: 16,
	},
	date: {
		color: "#fff",
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 2,
		marginLeft: 2,
		paddingHorizontal: 16,
	},
	dayTime: {
		color: "#d6d6f7",
		fontSize: 16,
		marginBottom: 18,
		marginLeft: 2,
		paddingHorizontal: 16,
	},
	entryDetailsContainer: {
		backgroundColor: "rgba(0,10,69,0.50)",
		borderRadius: 24,
		padding: 20,
		marginTop: 8,
		elevation: 8,
		marginHorizontal: 16,
	},
	moodContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 12,
	},
	mood: {
		fontSize: 36,
		marginRight: 8,
	},
	tagsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
		marginBottom: 12,
	},
	tag: {
		backgroundColor: "#6B5DD3",
		borderRadius: 16,
		paddingHorizontal: 14,
		paddingVertical: 6,
		marginRight: 8,
		marginBottom: 8,
	},
	tagText: {
		color: "#fff",
		fontSize: 15,
	},
	divider: {
		height: 1,
		backgroundColor: "rgba(255,255,255,0.18)",
		marginVertical: 12,
	},
	dreamText: {
		color: "#fff",
		fontSize: 16,
		lineHeight: 24,
		textAlign: "left",
	},
});

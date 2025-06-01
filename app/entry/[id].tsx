import { Feather, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getEntryById } from "../../constants/entries";

export default function EntryViewScreen() {
	const router = useRouter();
	const { id } = useLocalSearchParams();

	// Find the entry by id
	const entry = getEntryById(id as string);

	if (!entry) {
		return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
					<Ionicons name="chevron-back" size={32} color="#fff" />
				</TouchableOpacity>
				<Text style={styles.date}>Entry not found.</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{/* Back Arrow */}
			<TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
				<Ionicons name="chevron-back" size={32} color="#fff" />
			</TouchableOpacity>

			{/* Header */}
			<Text style={styles.date}>{entry.date}</Text>
			<Text style={styles.dayTime}>{entry.dayTime}</Text>

			{/* Entry Card (scrollable and fills screen) */}
			<ScrollView contentContainerStyle={styles.cardScroll} style={{ flex: 1 }}>
				<View style={styles.card}>
					{/* Mood and Edit Row */}
					<View style={styles.moodRow}>
						<Text style={styles.mood}>{entry.mood}</Text>
						<TouchableOpacity onPress={() => router.push({ pathname: "/edit/[id]", params: { id: entry.id } })}>
							<Feather name="edit-2" size={22} color="#fff" />
						</TouchableOpacity>
					</View>
					{/* Tags */}
					<View style={styles.tagsRow}>
						{entry.tags.map((tag, i) => (
							<View key={i} style={styles.tag}>
								<Text style={styles.tagText}>{tag.label}</Text>
							</View>
						))}
					</View>
					{/* Divider */}
					<View style={styles.divider} />
					{/* Dream Text */}
					<Text style={styles.dreamText}>{entry.text}</Text>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#4B378D",
		paddingHorizontal: 16,
		paddingTop: 56,
	},
	backBtn: {
		marginBottom: 12,
		marginLeft: 2,
		width: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	date: {
		color: "#fff",
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 2,
		marginLeft: 2,
	},
	dayTime: {
		color: "#d6d6f7",
		fontSize: 16,
		marginBottom: 18,
		marginLeft: 2,
	},
	cardScroll: {
		// No flexGrow or justifyContent
	},
	card: {
		backgroundColor: "#2D2266",
		borderRadius: 24,
		padding: 20,
		marginTop: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.18,
		shadowRadius: 24,
		elevation: 8,
		// No flex: 1
	},
	moodRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 12,
	},
	mood: {
		fontSize: 36,
		marginRight: 8,
	},
	tagsRow: {
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
	dreamScroll: {
		// maxHeight: 260, // REMOVE THIS LINE
	},
	dreamText: {
		color: "#fff",
		fontSize: 16,
		lineHeight: 24,
		textAlign: "left",
	},
});

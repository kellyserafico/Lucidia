import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEntries } from "./contexts/EntriesContext";

const moodOptions = ["😭", "☹️", "😐", "😊", "😁"];

const allTags = [
	"Forest",
	"Pool of Water",
	"Serene",
	"Curiosity",
	"Puzzle",
	"Mystery",
	"Chase",
	"Escape",
	"Funny",
	"Friends",
	"Adventure",
	"Mountains",
	"Night",
	"Stars",
	"Calm",
	"Celebration",
	"Family",
	"Peaceful",
	"Garden",
	"Beach",
	"Discovery",
	"Excitement",
];

export default function NewEntryDetailsScreen() {
	const { text, date, dayTime } = useLocalSearchParams();
	const router = useRouter();
	const { addEntry } = useEntries();

	const [selectedMood, setSelectedMood] = useState("😊");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	const toggleTag = (tag: string) => {
		setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
	};

	const handleSave = () => {
		const dateObj = new Date(Array.isArray(date) ? date[0] : date ?? "");
		const id = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;
		const entry = {
			id,
			date: Array.isArray(date) ? date[0] : date ?? "",
			dayTime: Array.isArray(dayTime) ? dayTime[0] : dayTime ?? "",
			text: Array.isArray(text) ? text[0] : text ?? "",
			mood: selectedMood,
			tags: selectedTags.map((label) => ({ label })),
		};

		addEntry(entry);
		router.replace("/home");
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.wrapper}>
				<Text style={styles.dateText}>{date}</Text>
				<Text style={styles.timeText}>{dayTime}</Text>

				<Text style={styles.sectionTitle}>Mood Upon Waking</Text>
				<View style={styles.emojiRow}>
					{moodOptions.map((emoji) => (
						<TouchableOpacity
							key={emoji}
							onPress={() => setSelectedMood(emoji)}
							style={[styles.emojiButton, selectedMood === emoji && styles.selectedEmoji]}
						>
							<Text style={styles.emoji}>{emoji}</Text>
						</TouchableOpacity>
					))}
				</View>

				<Text style={styles.sectionTitle}>Select Tags</Text>
				<View style={styles.tagRow}>
					{allTags.map((tag) => {
						const selected = selectedTags.includes(tag);
						return (
							<TouchableOpacity key={tag} onPress={() => toggleTag(tag)} style={[styles.tag, selected && styles.selectedTag]}>
								<Text style={styles.tagText}>{tag}</Text>
							</TouchableOpacity>
						);
					})}
				</View>

				<TouchableOpacity style={styles.button} onPress={handleSave}>
					<Text style={styles.buttonText}>Save Entry</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#2C1E57",
		paddingTop: 40,
	},
	wrapper: {
		width: "100%",
		maxWidth: 420,
		alignSelf: "center",
		paddingHorizontal: 24,
		paddingBottom: 64,
	},
	dateText: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#fff",
		marginBottom: 4,
	},
	timeText: {
		fontSize: 14,
		color: "#ccc",
		marginBottom: 24,
	},
	sectionTitle: {
		color: "#fff",
		fontWeight: "600",
		marginTop: 20,
		marginBottom: 8,
		fontSize: 16,
	},
	emojiRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 12,
	},
	emojiButton: {
		padding: 6,
		borderRadius: 12,
	},
	selectedEmoji: {
		backgroundColor: "#7B5EFF",
	},
	emoji: {
		fontSize: 28,
	},
	tagRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
		marginBottom: 12,
	},
	tag: {
		backgroundColor: "#3D2A74",
		borderRadius: 16,
		paddingHorizontal: 14,
		paddingVertical: 6,
		marginBottom: 8,
	},
	selectedTag: {
		backgroundColor: "#7B5EFF",
	},
	tagText: {
		color: "#fff",
		fontSize: 14,
	},
	button: {
		backgroundColor: "#7B5EFF",
		paddingVertical: 14,
		borderRadius: 12,
		alignItems: "center",
		marginTop: 30,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 16,
	},
});

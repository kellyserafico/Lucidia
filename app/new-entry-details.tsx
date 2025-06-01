import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { addEntry } from "../constants/entries";

const moodOptions = ["😭", "☹️", "😐", "😊", "😁"];

const defaultTags = {
	symbols: ["🌳 Forest", "🌊 Pool of Water"],
	emotions: ["Serene", "Curiosity"],
};

export default function NewEntryDetailsScreen() {
	const { text, date, dayTime } = useLocalSearchParams();
	const router = useRouter();

	const [selectedMood, setSelectedMood] = useState("😊");

	const handleSave = () => {
		const entry = {
			id: new Date().toISOString(),
			date: Array.isArray(date) ? date[0] : date ?? "",
			dayTime: Array.isArray(dayTime) ? dayTime[0] : dayTime ?? "",
			text: Array.isArray(text) ? text[0] : text ?? "",
			mood: selectedMood,
			tags: [...defaultTags.symbols.map((label) => ({ label })), ...defaultTags.emotions.map((label) => ({ label }))],
		};

		addEntry(entry);
		router.replace("/home"); // or "/home" if you have that route
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<Text style={styles.dateText}>{date}</Text>
				<Text style={styles.timeText}>{dayTime}</Text>

				{/* Mood Selection */}
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

				{/* Tags (symbols + emotions) */}
				<Text style={styles.sectionTitle}>Symbols</Text>
				<View style={styles.tagRow}>
					{defaultTags.symbols.map((tag) => (
						<View key={tag} style={styles.tag}>
							<Text style={styles.tagText}>{tag}</Text>
						</View>
					))}
				</View>

				<Text style={styles.sectionTitle}>Emotions within dream</Text>
				<View style={styles.tagRow}>
					{defaultTags.emotions.map((tag) => (
						<View key={tag} style={styles.tag}>
							<Text style={styles.tagText}>{tag}</Text>
						</View>
					))}
				</View>

				{/* Save Button */}
				<TouchableOpacity style={styles.button} onPress={handleSave}>
					<Text style={styles.buttonText}>Save Entry</Text>
				</TouchableOpacity>
			</View>
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

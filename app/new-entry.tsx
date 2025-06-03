import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
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

export default function NewEntryScreen() {
	const router = useRouter();
	const { addEntry } = useEntries();
	const [text, setText] = useState("");
	const [selectedMood, setSelectedMood] = useState("😊");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	const now = new Date();
	const isoDate = now.toLocaleDateString('en-CA');
	const formattedDate = now.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
	const weekday = now.toLocaleDateString("en-US", { weekday: "long" });
	const time = now.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
	});

	const toggleTag = (tag: string) => {
		setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
	};

	const handleSave = () => {
		const id = isoDate;
		const entry = {
			id,
			date: formattedDate,
			dayTime: `${weekday} | ${time}`,
			text,
			mood: selectedMood,
			tags: selectedTags.map((label) => ({ label })),
		};
		addEntry(entry);
		router.replace("/home");
	};

	return (
		<LinearGradient colors={["rgba(72, 52, 169, 0.75)", "rgba(69, 72, 166, 0.75)"]} style={{ flex: 1 }}>
			<SafeAreaView style={styles.container}>
				<TouchableOpacity style={styles.backBtn} onPress={() => router.replace("/home")}> 
					<Ionicons name="chevron-back" size={32} color="#fff" />
				</TouchableOpacity>
				<ScrollView contentContainerStyle={styles.wrapper}>
					<Text style={styles.dateText}>{formattedDate}</Text>
					<Text style={styles.timeText}>{`${weekday} | ${time}`}</Text>

					<TextInput
						style={styles.textArea}
						placeholder="Start typing..."
						placeholderTextColor="#aaa"
						multiline
						value={text}
						onChangeText={setText}
					/>

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

					<TouchableOpacity
						style={[styles.button, text.trim() === "" && styles.buttonDisabled]}
						disabled={text.trim() === ""}
						onPress={handleSave}
					>
						<Text style={styles.buttonText}>Save Entry</Text>
					</TouchableOpacity>
				</ScrollView>
			</SafeAreaView>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
		marginBottom: 16,
	},
	textArea: {
		backgroundColor: "rgba(0,10,69,0.50)",
		borderRadius: 16,
		padding: 16,
		fontSize: 16,
		color: "#fff",
		height: 280,
		textAlignVertical: "top",
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#fff",
		marginBottom: 8,
	},
	emojiRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 16,
	},
	emojiButton: {
		backgroundColor: "rgba(0,10,69,0.50)",
		borderRadius: 12,
		padding: 12,
		alignItems: "center",
	},
	selectedEmoji: {
		backgroundColor: "#7B5EFF",
	},
	emoji: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#fff",
	},
	tagRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginBottom: 16,
	},
	tag: {
		backgroundColor: "rgba(0,10,69,0.50)",
		borderRadius: 12,
		padding: 12,
		marginRight: 8,
		marginBottom: 8,
	},
	selectedTag: {
		backgroundColor: "#7B5EFF",
	},
	tagText: {
		fontSize: 16,
		color: "#fff",
	},
	button: {
		backgroundColor: "#7B5EFF",
		paddingVertical: 14,
		borderRadius: 12,
		alignItems: "center",
	},
	buttonDisabled: {
		backgroundColor: "#5c4bb3",
		opacity: 0.5,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 16,
	},
	backBtn: {
		marginBottom: 12,
		marginLeft: 2,
		width: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "flex-start",
	},
});

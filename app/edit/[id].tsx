import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { entries } from "../../constants/entries";

const moodOptions = ["😭", "☹️", "😐", "😊", "😁"];

export default function EditTextScreen() {
	const router = useRouter();
	const { id } = useLocalSearchParams();
	const entry = entries.find((e) => e.id === id);

	const [text, setText] = useState(entry ? entry.text : "");
	const [selectedMood, setSelectedMood] = useState(entry ? entry.mood : "😊");
	const [selectedTags, setSelectedTags] = useState(entry ? entry.tags.map((t) => t.label) : []);

	const allTags = Array.from(new Set(entries.flatMap((e) => e.tags.map((t) => t.label))));

	if (!entry) {
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.date}>Entry not found.</Text>
			</SafeAreaView>
		);
	}

	const toggleTag = (tag: string) => {
		setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
	};

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				keyboardVerticalOffset={64}
			>
				<View style={styles.contentWrapper}>
					<Text style={styles.date}>{entry.date}</Text>
					<Text style={styles.dayTime}>{entry.dayTime}</Text>

					<Text style={styles.sectionTitle}>Mood</Text>
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

					<Text style={styles.sectionTitle}>Dream Description</Text>
					<View style={{ flex: 1 }}>
						<View style={[styles.card, { flex: 1, minHeight: 180 }]}>
							<TextInput
								style={[styles.textInput, { flex: 1 }]}
								value={text}
								onChangeText={setText}
								multiline
								placeholder="Type your dream entry here..."
								placeholderTextColor="#bbb"
								textAlignVertical="top"
								scrollEnabled
							/>
						</View>
					</View>

					<Text style={styles.sectionTitle}>Tags</Text>
					<View style={styles.tagRow}>
						{allTags.map((tag) => (
							<TouchableOpacity
								key={tag}
								style={[styles.tag, selectedTags.includes(tag) && styles.selectedTag]}
								onPress={() => toggleTag(tag)}
							>
								<Text style={styles.tagText}>{tag}</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>

				<View style={styles.nextBtnContainer}>
					<TouchableOpacity
						style={styles.nextBtn}
						onPress={() => {
							entry.text = text;
							entry.mood = selectedMood;
							entry.tags = selectedTags.map((label) => ({ label }));
							router.back();
						}}
					>
						<Text style={styles.nextBtnText}>Save & Back</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#4B378D",
	},
	contentWrapper: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	date: {
		color: "#fff",
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 2,
	},
	dayTime: {
		color: "#d6d6f7",
		fontSize: 16,
		marginBottom: 18,
	},
	sectionTitle: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
		marginTop: 12,
		marginBottom: 8,
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
	card: {
		backgroundColor: "#2D2266",
		borderRadius: 18,
		padding: 16,
		marginBottom: 24,
		elevation: 8,
		minHeight: 180,
	},
	textInput: {
		color: "#fff",
		fontSize: 16,
		textAlignVertical: "top",
	},
	tagRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
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
	nextBtnContainer: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 56,
		width: "100%",
		zIndex: 10,
		paddingHorizontal: 24,
	},
	nextBtn: {
		backgroundColor: "#7B5EFF",
		borderRadius: 12,
		paddingVertical: 14,
		alignItems: "center",
	},
	nextBtnText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 18,
	},
});

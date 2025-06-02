import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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
			<SafeAreaView style={{ flex: 1 }}>
				<Text style={styles.date}>Entry not found.</Text>
			</SafeAreaView>
		);
	}

	const toggleTag = (tag: string) => {
		setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
	};

	return (
		<LinearGradient colors={["rgba(72, 52, 169, 0.75)", "rgba(69, 72, 166, 0.75)"]} style={{ flex: 1 }}>
			<SafeAreaView style={{ flex: 1 }}>
				<TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
					<Ionicons name="chevron-back" size={32} color="#fff" />
				</TouchableOpacity>
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
							<View style={[styles.inputBox, { flex: 1, minHeight: 180 }]}>
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
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	backBtn: {
		position: "absolute",
		left: 20,
		top: 24,
		zIndex: 10,
	},
	contentWrapper: {
		marginTop: 70,
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
	inputBox: {
		backgroundColor: "#rgba(0,10,69,0.50)",
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
		backgroundColor: "#rgba(0,10,69,0.50)",
		borderRadius: 16,
		paddingHorizontal: 14,
		paddingVertical: 16,
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

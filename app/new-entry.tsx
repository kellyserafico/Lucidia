import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function NewEntryScreen() {
	const router = useRouter();
	const [text, setText] = useState("");

	const now = new Date();
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

	const handleNext = () => {
		// Replace with actual save + navigate to tag/mood step
		router.push({
			pathname: "/new-entry-details",
			params: { text, date: formattedDate, dayTime: `${weekday} | ${time}` },
		});
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.contentWrapper}>
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

				<TouchableOpacity
					style={[styles.button, text.trim() === "" && styles.buttonDisabled]}
					disabled={text.trim() === ""}
					onPress={handleNext}
				>
					<Text style={styles.buttonText}>Next</Text>
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
	contentWrapper: {
		width: "100%",
		maxWidth: 420,
		alignSelf: "center",
		paddingHorizontal: 24,
		flex: 1,
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
		backgroundColor: "#3D2A74",
		borderRadius: 16,
		padding: 16,
		fontSize: 16,
		color: "#fff",
		height: 280,
		textAlignVertical: "top",
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowRadius: 6,
		shadowOffset: { width: 0, height: 2 },
		marginBottom: 24,
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
});

import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	FlatList,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { useEntries } from "../contexts/EntriesContext";

export default function SearchScreen() {
	const { entries } = useEntries();

	const [query, setQuery] = useState("");
	const router = useRouter();
	const now = new Date();
	const formattedDate = now.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

	const filteredEntries = entries.filter((entry) => {
		const lowerQuery = query.toLowerCase();
		return (
			entry.text.toLowerCase().includes(lowerQuery) || entry.tags.some((tag) => tag.label.toLowerCase().includes(lowerQuery))
		);
	});

	return (
		<LinearGradient colors={["rgba(72, 52, 169, 0.75)", "rgba(69, 72, 166, 0.75)"]} style={{ flex: 1 }}>
			<SafeAreaView style={styles.container}>
				<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
					<View style={styles.contentWrapper}>
						<Text style={styles.dateText}>{formattedDate}</Text>
						<TextInput
							style={styles.searchInput}
							placeholder="Search..."
							placeholderTextColor="#aaa"
							value={query}
							onChangeText={setQuery}
						/>
					</View>
					<FlatList
						contentContainerStyle={styles.listContent}
						data={[...filteredEntries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => router.push({ pathname: "/entry/[id]", params: { id: item.id } })}
								style={styles.entryCard}
							>
								<Text style={styles.entryDate}>{item.date}</Text>
								<View style={styles.entryRow}>
									<Text style={styles.entryEmoji}>{item.mood}</Text>
									<View>
										<Text style={styles.entryTitle} numberOfLines={1}>
											{item.text.split("\n")[0].slice(0, 32)}
											{item.text.split("\n")[0].length > 32 ? "…" : ""}
										</Text>
										<Text style={styles.entryTime}>{item.dayTime}</Text>
									</View>
								</View>
							</TouchableOpacity>
						)}
						style={{ flex: 1 }}
					/>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 40,
	},
	contentWrapper: {
		width: "100%",
		maxWidth: 420,
		alignSelf: "center",
		paddingHorizontal: 24,
	},
	dateText: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#fff",
		marginBottom: 16,
	},
	timeText: {
		fontSize: 14,
		color: "#ccc",
		marginBottom: 24,
	},
	searchInput: {
		backgroundColor: "#rgba(0,10,69,0.50)",
		borderRadius: 16,
		paddingVertical: 12,
		paddingHorizontal: 16,
		fontSize: 16,
		color: "#fff",
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowRadius: 6,
		shadowOffset: { width: 0, height: 2 },
	},
	listContent: {
		paddingHorizontal: 24,
		paddingTop: 24,
		paddingBottom: 24,
	},
	entryCard: {
		backgroundColor: "#rgba(0,10,69,0.50)",
		borderRadius: 12,
		padding: 12,
		marginBottom: 16,
	},
	entryRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	entryEmoji: {
		fontSize: 28,
	},
	entryTitle: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 14,
		maxWidth: 280,
	},
	entryTime: {
		color: "#ccc",
		fontSize: 12,
		marginTop: 2,
	},
	entryDate: {
		color: "#9C8CFF",
		fontSize: 13,
		marginBottom: 6,
		fontWeight: "500",
	},
});

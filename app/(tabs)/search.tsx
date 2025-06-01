import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { entries } from "../../constants/entries";

export default function SearchScreen() {
	const [query, setQuery] = useState("");
	const router = useRouter();
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

	// Filter entries
	const filteredEntries = entries.filter((entry) => {
		const lowerQuery = query.toLowerCase();
		return (
			entry.text.toLowerCase().includes(lowerQuery) || entry.tags.some((tag) => tag.label.toLowerCase().includes(lowerQuery))
		);
	});

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.contentWrapper}>
				<Text style={styles.dateText}>{formattedDate}</Text>
				<Text style={styles.timeText}>{`${weekday} | ${time}`}</Text>

				<TextInput
					style={styles.searchInput}
					placeholder="Search..."
					placeholderTextColor="#aaa"
					value={query}
					onChangeText={setQuery}
				/>

				<FlatList
					data={filteredEntries}
					keyExtractor={(item) => item.id}
					style={{ marginTop: 24 }}
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
										{item.text.split("\n")[0]}
									</Text>
									<Text style={styles.entryTime}>{item.dayTime}</Text>
								</View>
							</View>
						</TouchableOpacity>
					)}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#2C1E57", // purple background
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
		marginBottom: 4,
	},
	timeText: {
		fontSize: 14,
		color: "#ccc",
		marginBottom: 24,
	},
	searchInput: {
		backgroundColor: "#3D2A74",
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

	entryCard: {
		backgroundColor: "#443072",
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

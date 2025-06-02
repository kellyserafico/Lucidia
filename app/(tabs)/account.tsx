import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

export default function AccountScreen() {
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

	const [notificationsEnabled, setNotificationsEnabled] = useState(true);
	const [darkModeEnabled, setDarkModeEnabled] = useState(false);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.contentWrapper}>
				<Text style={styles.dateText}>{formattedDate}</Text>
				<Text style={styles.timeText}>{`${weekday} | ${time}`}</Text>

				<View style={styles.profileCard}>
					<Text style={styles.profileEmoji}>👤</Text>
					<Text style={styles.username}>Peter Anteater</Text>
				</View>

				{/* Settings */}
				<View style={styles.settingsSection}>
					<Text style={styles.sectionTitle}>Settings</Text>

					<TouchableOpacity style={styles.settingRow}>
						<Text style={styles.settingText}>Edit Profile</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.settingRow}>
						<Text style={styles.settingText}>Change Password</Text>
					</TouchableOpacity>

					<View style={styles.settingRow}>
						<Text style={styles.settingText}>Notifications</Text>
						<Switch
							value={notificationsEnabled}
							onValueChange={setNotificationsEnabled}
							thumbColor={notificationsEnabled ? "#7B5EFF" : "#888"}
							trackColor={{ false: "#555", true: "#9C8CFF" }}
						/>
					</View>

					<View style={styles.settingRow}>
						<Text style={styles.settingText}>Dark Mode</Text>
						<Switch
							value={darkModeEnabled}
							onValueChange={setDarkModeEnabled}
							thumbColor={darkModeEnabled ? "#7B5EFF" : "#888"}
							trackColor={{ false: "#555", true: "#9C8CFF" }}
						/>
					</View>
				</View>

				{/* Log Out */}
				<TouchableOpacity style={[styles.button, styles.logoutButton]}>
					<Text style={[styles.buttonText, { color: "#ff8c8c" }]}>Log Out</Text>
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
	profileCard: {
		backgroundColor: "#3D2A74",
		borderRadius: 16,
		padding: 24,
		alignItems: "center",
		marginBottom: 32,
	},
	profileEmoji: {
		fontSize: 48,
		marginBottom: 12,
	},
	username: {
		fontSize: 18,
		color: "#fff",
		fontWeight: "600",
	},
	settingsSection: {
		marginBottom: 32,
	},
	sectionTitle: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 16,
		marginBottom: 12,
	},
	settingRow: {
		backgroundColor: "#3D2A74",
		borderRadius: 12,
		paddingVertical: 14,
		paddingHorizontal: 16,
		marginBottom: 12,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	settingText: {
		color: "#fff",
		fontSize: 16,
	},
	button: {
		paddingVertical: 14,
		borderRadius: 12,
		alignItems: "center",
	},
	logoutButton: {
		backgroundColor: "#442B55",
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "600",
	},
});

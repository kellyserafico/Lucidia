import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
	const today = new Date();
	const currentYear = today.getFullYear();
	const currentMonth = today.getMonth(); // 0 = Jan
	const currentDate = today.getDate();
	const weekdayName = today.toLocaleDateString("en-US", { weekday: "long" });
	const timeString = today.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
	});

	const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday
	const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
	const monthName = today.toLocaleDateString("en-US", { month: "long" });

	const daysArray = Array.from({ length: firstDayOfMonth + daysInMonth }, (_, i) => {
		if (i < firstDayOfMonth) return null;
		return i - firstDayOfMonth + 1;
	});

	return (
		<SafeAreaView style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.dateText}>{`${monthName} ${currentDate}th, ${currentYear}`}</Text>
				<Text style={styles.timeText}>{`${weekdayName} | ${timeString}`}</Text>
			</View>

			{/* Calendar */}
			<View style={styles.calendarCard}>
				<Text style={styles.calendarTitle}>{monthName}</Text>
				<View style={styles.calendarGrid}>
					{["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
						<Text key={d} style={styles.dayHeader}>
							{d}
						</Text>
					))}

					{daysArray.map((day, i) =>
						day ? (
							<Text key={i} style={[styles.dateTextCell, day === currentDate && styles.today]}>
								{day}
							</Text>
						) : (
							<View key={i} style={styles.emptySpace} />
						)
					)}
				</View>
			</View>

			{/* Event Card */}
			<View style={styles.eventCard}>
				<Text style={styles.emoji}>😊</Text>
				<View>
					<Text style={styles.eventTitle}>Walking Through Memories</Text>
					<Text style={styles.eventTime}>May 25, 2025 | Monday 10:00 AM</Text>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#2C1E57",
		paddingHorizontal: 32,
		paddingTop: 40,
	},

	header: {
		marginBottom: 20,
	},
	dateText: {
		fontSize: 20,
		color: "#ffffff",
		fontWeight: "600",
	},
	timeText: {
		color: "#ccc",
		marginTop: 4,
	},
	calendarCard: {
		backgroundColor: "#3D2A74",
		borderRadius: 20,
		padding: 16,
		marginBottom: 20,
	},
	calendarTitle: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 12,
	},
	calendarGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	dayHeader: {
		width: "14.2%",
		color: "#aaa",
		textAlign: "center",
		fontWeight: "600",
		marginBottom: 8,
	},
	dateTextCell: {
		width: "14.2%",
		textAlign: "center",
		color: "#eee",
		paddingVertical: 6,
		marginBottom: 6,
	},
	today: {
		backgroundColor: "#7B5EFF",
		color: "#fff",
		borderRadius: 10,
		fontWeight: "bold",
	},
	emptySpace: {
		width: "14.2%",
		marginBottom: 6,
	},
	eventCard: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#443072",
		borderRadius: 12,
		padding: 14,
	},
	emoji: {
		fontSize: 28,
		marginRight: 12,
	},
	eventTitle: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 16,
	},
	eventTime: {
		color: "#ccc",
		fontSize: 12,
		marginTop: 2,
	},
});

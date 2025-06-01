import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { entries } from "../../constants/entries";

interface Week extends Array<number | null> {}
type Weeks = Week[];

interface Entry {
	id: string;
	mood: string;
	date: string;
	dayTime: string;
}

export default function HomeScreen() {
	const router = useRouter();
	const today = new Date();
	const [displayedMonth, setDisplayedMonth] = useState(today.getMonth());
	const [displayedYear] = useState(today.getFullYear());
	const [selectedDate, setSelectedDate] = useState({
		year: today.getFullYear(),
		month: today.getMonth(),
		day: today.getDate(),
	});

	const getDateSuffix = (day: number) => {
		if (day >= 11 && day <= 13) return `${day}th`;
		switch (day % 10) {
			case 1:
				return `${day}st`;
			case 2:
				return `${day}nd`;
			case 3:
				return `${day}rd`;
			default:
				return `${day}th`;
		}
	};

	const isPrevMonthAllowed = displayedMonth > 4;
	const isNextMonthAllowed = displayedMonth < 5;

	const weeksByMonth: { [key: string]: Weeks } = {
		"2025-4": [
			[null, null, null, 1, 2, 3, 4],
			[5, 6, 7, 8, 9, 10, 11],
			[12, 13, 14, 15, 16, 17, 18],
			[19, 20, 21, 22, 23, 24, 25],
			[26, 27, 28, 29, 30, 31, null],
		],
		"2025-5": [
			[1, 2, 3, 4, 5, 6, 7],
			[8, 9, 10, 11, 12, 13, 14],
			[15, 16, 17, 18, 19, 20, 21],
			[22, 23, 24, 25, 26, 27, 28],
			[29, 30, null, null, null, null, null],
		],
	};
	const weeks = weeksByMonth[`${displayedYear}-${displayedMonth}`] || [];
	const monthName = displayedMonth === 4 ? "May" : "June";

	const selectedId = `${selectedDate.year}-${String(selectedDate.month + 1).padStart(2, "0")}-${String(selectedDate.day).padStart(
		2,
		"0"
	)}`;
	const selectedEntry = entries.find((e) => e.id === selectedId);

	const selectedDateObj = new Date(selectedDate.year, selectedDate.month, selectedDate.day);
	const selectedMonthName = selectedDateObj.toLocaleDateString("en-US", { month: "long" });
	const selectedDay = selectedDateObj.getDate();
	const selectedYear = selectedDateObj.getFullYear();
	const selectedWeekday = selectedDateObj.toLocaleDateString("en-US", { weekday: "long" });

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ flex: 1, justifyContent: "flex-start" }}>
				<View style={styles.header}>
					<Text style={styles.dateText}>{`${selectedMonthName} ${getDateSuffix(selectedDay)}, ${selectedYear}`}</Text>
					<Text style={styles.timeText}>{selectedWeekday}</Text>
				</View>

				<View style={styles.calendarCard}>
					<TouchableOpacity
						style={[styles.arrowBtn, styles.arrowLeft, !isPrevMonthAllowed && styles.arrowBtnDisabled]}
						disabled={!isPrevMonthAllowed}
						onPress={() => setDisplayedMonth(displayedMonth - 1)}
					>
						<Text style={styles.arrowText}>{"‹"}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.arrowBtn, styles.arrowRight, !isNextMonthAllowed && styles.arrowBtnDisabled]}
						disabled={!isNextMonthAllowed}
						onPress={() => setDisplayedMonth(displayedMonth + 1)}
					>
						<Text style={styles.arrowText}>{"›"}</Text>
					</TouchableOpacity>

					<Text style={styles.calendarTitle}>{monthName}</Text>
					<View style={styles.calendarGrid}>
						{["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
							<Text key={d} style={styles.dayHeader}>
								{d}
							</Text>
						))}

						{(weeks as Weeks).map((week, wi) => (
							<View key={wi} style={{ flexDirection: "row", width: "100%" }}>
								{week.map((day, i) => {
									if (!day) return <View key={i} style={styles.emptySpace} />;
									const isFutureDate =
										displayedYear > today.getFullYear() ||
										(displayedYear === today.getFullYear() && displayedMonth > today.getMonth()) ||
										(displayedYear === today.getFullYear() && displayedMonth === today.getMonth() && day > today.getDate());
									const dateId = `${displayedYear}-${String(displayedMonth + 1).padStart(2, "0")}-${String(day).padStart(
										2,
										"0"
									)}`;
									const hasEntry = entries.some((e) => e.id === dateId);
									const isSelected =
										selectedDate.year === displayedYear && selectedDate.month === displayedMonth && selectedDate.day === day;
									return (
										<TouchableOpacity
											key={i}
											disabled={isFutureDate}
											style={[
												styles.dateTextCell,
												isSelected && styles.selectedDay,
												day === today.getDate() &&
													displayedMonth === today.getMonth() &&
													displayedYear === today.getFullYear() &&
													styles.today,
												isFutureDate && styles.futureDate,
											]}
											onPress={() => setSelectedDate({ year: displayedYear, month: displayedMonth, day })}
										>
											<Text style={[styles.dateTextCellText, isFutureDate && styles.futureDateText]}>{day}</Text>
											{hasEntry && <View style={styles.dot} />}
										</TouchableOpacity>
									);
								})}
							</View>
						))}
					</View>
				</View>

				{selectedEntry ? (
					<TouchableOpacity
						style={styles.eventCard}
						onPress={() => router.push({ pathname: "/entry/[id]", params: { id: selectedEntry.id } })}
					>
						<Text style={styles.emoji}>{selectedEntry.mood}</Text>
						<View>
							<Text style={styles.eventTitle}>Walking Through Memories</Text>
							<Text style={styles.eventTime}>
								{selectedEntry.date} | {selectedEntry.dayTime}
							</Text>
						</View>
					</TouchableOpacity>
				) : (
					<Text style={styles.noEntryText}>There are no entries for this day</Text>
				)}
			</View>

			<View style={styles.addEntryBtnContainer}>
				<TouchableOpacity style={styles.addEntryBtn} onPress={() => router.push("/new-entry")}>
					<Text style={styles.addEntryBtnText}>Add Entry</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#2C1E57",
		paddingTop: 96,
	},
	header: {
		paddingHorizontal: 24,
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
		paddingHorizontal: 16,
		paddingVertical: 28,
		marginHorizontal: 24,
		marginBottom: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.15,
		shadowRadius: 10,
		elevation: 6,
		position: "relative",
	},
	calendarTitle: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 24,
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
		marginBottom: 16,
	},
	dateTextCell: {
		width: "14.2%",
		aspectRatio: 1,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 8,
		borderRadius: 10,
	},
	dateTextCellText: {
		color: "#eee",
		fontSize: 16,
		fontWeight: "400",
		textAlign: "center",
	},
	today: {
		backgroundColor: "#7B5EFF",
		borderRadius: 10,
	},
	emptySpace: {
		width: "14.2%",
		aspectRatio: 1,
		marginBottom: 14,
	},
	eventCard: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#443072",
		borderRadius: 12,
		padding: 14,
		marginHorizontal: 24,
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
	arrowBtn: {
		position: "absolute",
		top: 12,
		zIndex: 2,
		borderRadius: 20,
		padding: 8,
	},
	arrowLeft: {
		left: 8,
	},
	arrowRight: {
		right: 8,
	},
	arrowBtnDisabled: {
		opacity: 0.3,
	},
	arrowText: {
		color: "#fff",
		fontSize: 32,
		fontWeight: "bold",
	},
	futureDate: {
		opacity: 0.3,
	},
	futureDateText: {
		color: "#aaa",
	},
	dot: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: "#B6A8F7",
		alignSelf: "center",
		marginTop: 2,
	},
	selectedDay: {
		backgroundColor: "#B6A8F7",
	},
	noEntryText: {
		color: "#fff",
		textAlign: "center",
		marginTop: 32,
		fontSize: 16,
		opacity: 0.7,
	},
	addEntryBtnContainer: {
		paddingHorizontal: 24,
		paddingBottom: 16,
		backgroundColor: "#2C1E57",
	},

	addEntryBtn: {
		backgroundColor: "#7B5EFF",
		borderRadius: 12,
		paddingVertical: 14,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 8,
	},

	addEntryBtnText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 18,
	},
});

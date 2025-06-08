import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEntries } from "../contexts/EntriesContext";

export default function HomeScreen() {
	const router = useRouter();
	const { entries } = useEntries();
	const today = new Date();
	const [displayedMonthNum, setDisplayedMonthNum] = useState(today.getMonth());
	const [selectedDate, setSelectedDate] = useState({
		year: today.getFullYear(),
		month: today.getMonth(),
		day: today.getDate()
	});
	const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
	const weeksForMay: Array<Array<number | null>> = [
		[null, null, null, 1, 2, 3, 4],
		[5, 6, 7, 8, 9, 10, 11],
		[12, 13, 14, 15, 16, 17, 18],
		[19, 20, 21, 22, 23, 24, 25],
		[26, 27, 28, 29, 30, 31, null]
	];
	const weeksForJune: Array<Array<number | null>> = [
		[1, 2, 3, 4, 5, 6, 7],
		[8, 9, 10, 11, 12, 13, 14],
		[15, 16, 17, 18, 19, 20, 21],
		[22, 23, 24, 25, 26, 27, 28],
		[29, 30, null, null, null, null, null]
	];
	const weeks = displayedMonthNum === 4 ? weeksForMay : weeksForJune;
	const selectedId = `${selectedDate.year}-${String(selectedDate.month + 1).padStart(2, "0")}-${String(selectedDate.day).padStart(2, "0")}`;
	const selectedEntry = entries.find((e) => e.id === selectedId);
	const selectedMonth = displayedMonthNum === 4 ? "May" : "June";
	const selectedDay = selectedDate.day;
	const selectedWeekday = new Date(selectedDate.year, selectedDate.month, selectedDate.day).toLocaleDateString("en-US", { weekday: "long" });

	const getDateEndString = (day: number) => {
		if (day > 4 && day < 20) {
			return `${day}th`;
		} else if (day % 10 === 1) {
			return `${day}st`;
		} else if (day % 10 === 2) {
			return `${day}nd`;
		} else if (day % 10 === 3) {
			return `${day}rd`;
		} else {
			return `${day}th`;
		}
	};

	return (
		<LinearGradient colors={["rgba(72, 52, 169, 0.75)", "rgba(69, 72, 166, 0.75)"]} style={{ flex: 1 }}>
			<SafeAreaView style={styles.container}>
				<ScrollView>
					<View style={styles.header}>
						<Text style={styles.dateText}>{`${selectedMonth} ${getDateEndString(selectedDay)}, ${selectedDate.year}`}</Text>
						<Text style={styles.timeText}>{selectedWeekday}</Text>
					</View>

					<View style={styles.calendarContainer}>
						<TouchableOpacity
							style={[styles.arrowBtn, styles.arrowLeft, displayedMonthNum === 4 && styles.arrowBtnDisabled]}
							disabled={displayedMonthNum === 4}
							onPress={() => setDisplayedMonthNum(displayedMonthNum - 1)}>
							<Text style={styles.arrowText}>{"‹"}</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.arrowBtn, styles.arrowRight, displayedMonthNum === 5 && styles.arrowBtnDisabled]}
							disabled={displayedMonthNum === 5}
							onPress={() => setDisplayedMonthNum(displayedMonthNum + 1)}>
							<Text style={styles.arrowText}>{"›"}</Text>
						</TouchableOpacity>

						<Text style={styles.calendarTitle}>{selectedMonth}</Text>
						<View style={styles.calendarGrid}>
							{weekdays.map((day, index) => (
								<Text key={index} style={styles.weekdayName}>
									{day}
								</Text>
							))}

							{weeks.map((week, weekIndex) => (
								<View key={weekIndex} style={{ flexDirection: "row", width: "100%" }}>
									{week.map((day, dayIndex) => {
										const dateId = `${selectedDate.year}-${String(displayedMonthNum + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
										const hasEntry = entries.some((e) => e.id === dateId);
										const isSelected = selectedDate.month === displayedMonthNum && selectedDate.day === day;
										const checkInvalidDate = day === null || (displayedMonthNum === today.getMonth() && day > today.getDate());

										return (
											<TouchableOpacity
												key={dayIndex}
												disabled={checkInvalidDate}
												style={[
													styles.individualDate,
													isSelected && styles.selectedDay,
													day === today.getDate() && displayedMonthNum === today.getMonth() && styles.today,
													checkInvalidDate && styles.invalidDate
												]}
												onPress={() =>
													setSelectedDate({
														year: 2025,
														month: displayedMonthNum,
														day: day ?? 0,
													})
												}>
												<Text style={[styles.individualDateText, checkInvalidDate && styles.invalidDateText]}>
													{day}
												</Text>
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
							style={styles.entryCard}
							onPress={() => router.push({ pathname: "/entry/[id]", params: { id: selectedEntry.id } })}>
							<Text style={styles.emoji}>{selectedEntry.mood}</Text>
							<View>
								<Text style={styles.entryTime}>
									{selectedEntry.date} | {selectedEntry.dayTime}
								</Text>
								<Text style={styles.entryTitle} numberOfLines={1}>
									{((selectedEntry).text || "No description").slice(0, 30)}
									...
								</Text>
							</View>
						</TouchableOpacity>
					) : (
						<Text style={styles.noEntryText}>There are no entries for this day</Text>
					)}
				</ScrollView>

				<View style={styles.addEntryBtnContainer}>
					<TouchableOpacity style={styles.addEntryBtn} onPress={() => router.push("/new-entry")}>
						<Text style={styles.addEntryBtnText}>Add Today's Entry</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 50
	},
	header: {
		paddingHorizontal: 24,
		marginBottom: 20
	},
	dateText: {
		fontSize: 20,
		color: "#ffffff",
		fontWeight: "600"
	},
	timeText: {
		color: "#ccc",
		marginTop: 4
	},
	calendarContainer: {
		backgroundColor: "rgba(0, 10, 69, 0.5)",
		borderRadius: 20,
		paddingHorizontal: 16,
		paddingVertical: 28,
		marginHorizontal: 24,
		marginBottom: 20,
		position: "relative"
	},
	calendarTitle: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 24
	},
	calendarGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between"
	},
	weekdayName: {
		width: "14%",
		color: "#aaa",
		textAlign: "center",
		fontWeight: "600",
		marginBottom: 16
	},
	individualDate: {
		width: "14%",
		aspectRatio: 1,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 8,
		borderRadius: 10
	},
	individualDateText: {
		color: "#eee",
		fontSize: 16,
		fontWeight: "400",
		textAlign: "center"
	},
	today: {
		backgroundColor: "#7B5EFF",
		borderRadius: 10
	},
	emptySpace: {
		width: "14%",
		aspectRatio: 1,
		marginBottom: 14
	},
	entryCard: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#4548A6",
		borderRadius: 12,
		padding: 14,
		marginHorizontal: 24
	},
	emoji: {
		fontSize: 28,
		marginRight: 12
	},
	entryTitle: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 16
	},
	entryTime: {
		color: "#ccc",
		fontSize: 12,
		marginTop: 2
	},
	arrowBtn: {
		position: "absolute",
		top: 12,
		zIndex: 2,
		borderRadius: 20,
		padding: 8
	},
	arrowLeft: {
		left: 8
	},
	arrowRight: {
		right: 8
	},
	arrowBtnDisabled: {
		opacity: 0.3
	},
	arrowText: {
		color: "#fff",
		fontSize: 32,
		fontWeight: "bold"
	},
	invalidDate: {
		opacity: 0.3
	},
	invalidDateText: {
		color: "#aaa"
	},
	dot: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: "#B6A8F7",
		alignSelf: "center",
		marginTop: 2
	},
	selectedDay: {
		backgroundColor: "#B6A8F7"
	},
	noEntryText: {
		color: "#fff",
		textAlign: "center",
		marginTop: 32,
		fontSize: 16,
		opacity: 0.7
	},
	addEntryBtnContainer: {
		paddingHorizontal: 24,
		paddingBottom: Platform.OS === "web" ? 24 : 80
	},

	addEntryBtn: {
		backgroundColor: "#7B5EFF",
		borderRadius: 12,
		paddingVertical: 14,
		alignItems: "center"
	},

	addEntryBtnText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 18
	}
});

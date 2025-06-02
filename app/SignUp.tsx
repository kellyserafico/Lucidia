import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignUpScreen() {
	const router = useRouter();
	const [step, setStep] = useState<'form' | 'reminder'>('form');
	const [reminderChoice, setReminderChoice] = useState<null | 'yes' | 'no'>(null);

	return (
		<LinearGradient
			colors={["rgba(72, 52, 169, 0.75)", "rgba(69, 72, 166, 0.75)"]}
			style={{ flex: 1 }}>
			<SafeAreaView style={styles.container}>
				{step === 'form' && (
						<View>
							<Text style={styles.heading}>What are your details?</Text>
							<View style={styles.formBox}>
								<View style={{ marginBottom: 18 }}>
									<Text style={styles.inputLabel}>First Name</Text>
									<TextInput
										style={styles.inputBox}
										placeholder="Enter your first name"
										placeholderTextColor="hsla(0, 0.00%, 46.30%, 0.80)"
									/>
								</View>

								<View style={{ marginBottom: 18 }}>
									<Text style={styles.inputLabel}>Last Name</Text>
									<TextInput
										style={styles.inputBox}
										placeholder="Enter your last name"
										placeholderTextColor="hsla(0, 0.00%, 46.30%, 0.80)"
									/>
								</View>
								
								<View style={{ marginBottom: 18 }}>
									<Text style={styles.inputLabel}>Email</Text>
									<TextInput
										style={styles.inputBox}
										placeholder="Enter your email"
										placeholderTextColor="hsla(0, 0.00%, 46.30%, 0.80)"
									/>
								</View>

								<View style={{ marginBottom: 18 }}>
									<Text style={styles.inputLabel}>Password</Text>
									<TextInput
										style={styles.inputBox}
										placeholder="Enter your password"
										placeholderTextColor="hsla(0, 0.00%, 46.30%, 0.80)"
										secureTextEntry
									/>
								</View>

								<View style={{ marginBottom: 18 }}>
									<Text style={styles.inputLabel}>Re-enter password</Text>
									<TextInput
										style={styles.inputBox}
										placeholder="Re-enter your password"
										placeholderTextColor="hsla(0, 0.00%, 46.30%, 0.80)"
										secureTextEntry
									/>
								</View>
							</View>
						</View>
				)}

				{step === 'reminder' && (
					<View>
						<Text style={styles.heading}>Do you want to receive reminders to journal when you wake ?</Text>
						<View style={styles.reminderCard}>
							<TouchableOpacity
								style={[styles.reminderButton, { marginBottom: 18 }, reminderChoice === 'yes' && { backgroundColor: "rgba(123, 94, 255, 0.4)" }]}
								onPress={() => setReminderChoice('yes')}>
								<Text style={styles.reminderBtnText}>Yes, send me reminders.</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[styles.reminderButton, reminderChoice === 'no' && { backgroundColor: "rgba(123, 94, 255, 0.4)" }]}
								onPress={() => setReminderChoice('no')}>
								<Text style={styles.reminderBtnText}>No, don't send me reminders.</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}

				<View style={styles.buttonContainer}>
					<TouchableOpacity
						disabled={step === 'reminder' ? !reminderChoice : false}
						style={[styles.button, (step === 'reminder' ? !reminderChoice : false) && { backgroundColor: "rgba(123, 94, 255, 0.4)" }]}
						onPress={() => { step === 'form' ? setStep('reminder') : router.push('/(tabs)/home') }}>
						<Text style={styles.buttonText}>Continue</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 0,
		justifyContent: "flex-start",
	},

	heading: {
		fontSize: 28,
		fontWeight: "400",
		color: "#fff",
		marginTop: 60,
		marginBottom: 32,
		textAlign: "center",
		paddingHorizontal: 24,
	},

	formBox: {
		borderRadius: 40,
		padding: 28,
		backgroundColor: "rgba(0, 10, 69, 0.5)",
		marginBottom: 32,
		marginHorizontal: 24,
	},

	inputLabel: {
		color: "#fff",
		fontSize: 16,
		marginBottom: 8,
		marginLeft: 2,
		fontWeight: "400",
	},

	inputBox: {
		backgroundColor: "rgba(255, 255, 255, 0.05)",
		borderColor: "#9C8CFF",
		borderWidth: 1,
		borderRadius: 12,
		paddingHorizontal: 14,
		paddingVertical: 14,
		color: "#fff",
		fontSize: 16,
	},

	button: {
		backgroundColor: "#7B5EFF",
		paddingVertical: 16,
		borderRadius: 14,
		alignItems: "center",
		marginHorizontal: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},

	buttonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 18,
	},

	reminderCard: {
		backgroundColor: "rgba(0, 10, 69, 0.5)",
		borderRadius: 32,
		marginHorizontal: 12,
		marginBottom: 32,
		paddingVertical: 28,
		paddingHorizontal: 8,
	},

	reminderButton: {
		backgroundColor: "#7B5EFF",
		paddingVertical: 16,
		borderRadius: 14,
		alignItems: "center",
		marginHorizontal: 16,
		height: 70,
		justifyContent: 'center',
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},

	reminderBtnText: {
		color: "#fff",
		fontSize: 17,
	},

	buttonContainer: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 56,
		width: '100%',
	}
});

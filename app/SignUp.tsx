import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignUpScreen() {
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [step, setStep] = useState<'form' | 'reminder'>('form');
	const [reminderChoice, setReminderChoice] = useState<null | 'yes' | 'no'>(null);
	const router = useRouter();

	const handleChange = (field: string, value: string) => {
		setForm({ ...form, [field]: value });
	};

	const isFormValid = () =>
		form.firstName && form.lastName && form.email && form.password && form.password === form.confirmPassword;

	return (
		<LinearGradient
			colors={["#4B378D", "#2C1E57"]}
			style={styles.gradient}>
			<SafeAreaView style={styles.container}>
				{step === 'form' && (
						<><Text style={styles.heading}>What are your details?</Text>
						<View style={styles.formBox}>
							<View style={styles.inputGroup}>
								<Text style={styles.label}>First Name</Text>
								<TextInput
									style={styles.input}
									placeholder="Enter your first name"
									placeholderTextColor="#ccc"
									onChangeText={(value) => handleChange("firstName", value)}
								/>
							</View>

							<View style={styles.inputGroup}>
								<Text style={styles.label}>Last Name</Text>
								<TextInput
									style={styles.input}
									placeholder="Enter your last name"
									placeholderTextColor="#ccc"
									onChangeText={(value) => handleChange("lastName", value)}
								/>
							</View>
							
							<View style={styles.inputGroup}>
								<Text style={styles.label}>Enter your email</Text>
								<TextInput
									style={styles.input}
									placeholder="Enter your email"
									placeholderTextColor="#ccc"
									keyboardType="email-address"
									autoCapitalize="none"
									onChangeText={(value) => handleChange("email", value)}
								/>
							</View>

							<View style={styles.inputGroup}>
								<Text style={styles.label}>Enter your password</Text>
								<TextInput
									style={styles.input}
									placeholder="Enter your password"
									placeholderTextColor="#ccc"
									secureTextEntry
									onChangeText={(value) => handleChange("password", value)}
								/>
							</View>

							<View style={styles.inputGroup}>
								<Text style={styles.label}>Re-enter your password</Text>
								<TextInput
									style={styles.input}
									placeholder="Re-enter your password"
									placeholderTextColor="#ccc"
									secureTextEntry
									onChangeText={(value) => handleChange("confirmPassword", value)}
								/>
							</View>
						</View></>
				)}

				{step === 'reminder' && (
					<>
						<Text style={styles.heading}>Do you want to receive reminders to journal when you wake ?</Text>
						<View style={styles.reminderCard}>
							<TouchableOpacity
								style={[styles.reminderBtn, reminderChoice === 'yes' && styles.reminderBtnSelected]}
								onPress={() => setReminderChoice('yes')}>
								<Text style={styles.reminderBtnText}>Yes, send me reminders.</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[styles.reminderBtn, reminderChoice === 'no' && styles.reminderBtnSelected]}
								onPress={() => setReminderChoice('no')}>
								<Text style={styles.reminderBtnText}>No, don't send me reminders.</Text>
							</TouchableOpacity>
						</View>
					</>
				)}

				<View style={styles.buttonContainer}>
					<TouchableOpacity
						disabled={step === 'form' ? !isFormValid() : !reminderChoice}
						style={[styles.button, (step === 'form' ? !isFormValid() : !reminderChoice) && styles.buttonDisabled]}
						onPress={() => {
							if (step === 'form') {
								setStep('reminder');
							}
							else {
								router.push('/(tabs)/home');
							}
						}}>
						<Text style={styles.buttonText}>Continue</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	gradient: {
		flex: 1,
	},

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
		backgroundColor: "hsl(272, 23.10%, 12.70%)",
		marginBottom: 32,
		marginHorizontal: 24,
	},

	inputGroup: {
		marginBottom: 18,
	},

	label: {
		color: "#fff",
		fontSize: 16,
		marginBottom: 6,
		marginLeft: 2,
		fontWeight: "400",
	},

	input: {
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
	},

	buttonDisabled: {
		backgroundColor: "rgba(123, 94, 255, 0.4)",
	},

	buttonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 18,
	},

	reminderCard: {
		backgroundColor: "#2D2266",
		borderRadius: 32,
		marginHorizontal: 12,
		marginBottom: 32,
		paddingVertical: 28,
		paddingHorizontal: 8,
	},

	reminderBtn: {
		backgroundColor: "#7B5EFF",
		paddingVertical: 16,
		borderRadius: 14,
		alignItems: "center",
		marginHorizontal: 16,
		marginBottom: 18,
	},

	reminderBtnSelected: {
		backgroundColor: "rgba(123, 94, 255, 0.4)",
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
		zIndex: 10,
	}
});

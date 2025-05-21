import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

export default function SignUpScreen() {
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleChange = (field: string, value: string) => {
		setForm({ ...form, [field]: value });
	};

	const isFormValid = () =>
		form.firstName && form.lastName && form.email && form.password && form.password === form.confirmPassword;

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar hidden />
			<Text style={styles.heading}>What are your details?</Text>

			<BlurView intensity={100} tint="dark" style={styles.formBox}>
				<TextInput
					style={styles.input}
					placeholder="Enter your first name"
					placeholderTextColor="#ccc"
					onChangeText={(value) => handleChange("firstName", value)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Enter your last name"
					placeholderTextColor="#ccc"
					onChangeText={(value) => handleChange("lastName", value)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Enter your email"
					placeholderTextColor="#ccc"
					keyboardType="email-address"
					autoCapitalize="none"
					onChangeText={(value) => handleChange("email", value)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Enter your password"
					placeholderTextColor="#ccc"
					secureTextEntry
					onChangeText={(value) => handleChange("password", value)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Re-enter your password"
					placeholderTextColor="#ccc"
					secureTextEntry
					onChangeText={(value) => handleChange("confirmPassword", value)}
				/>
			</BlurView>

			<TouchableOpacity
				disabled={!isFormValid()}
				style={[styles.button, !isFormValid() && styles.buttonDisabled]}
				onPress={() => console.log("Continue")}
			>
				<Text style={styles.buttonText}>Continue</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#2C1E57",
		paddingHorizontal: 24,
		justifyContent: "center",
	},
	heading: {
		fontSize: 24,
		fontWeight: "600",
		color: "#fff",
		marginBottom: 16,
	},
	formBox: {
		borderRadius: 20,
		padding: 20,
		backgroundColor: "hsla(274, 20%, 46%, 0.4)",
		marginBottom: 20,
	},
	input: {
		backgroundColor: "rgba(255, 255, 255, 0.05)",
		borderColor: "#9C8CFF",
		borderWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 12,
		paddingVertical: 10,
		marginBottom: 12,
		color: "#fff",
	},
	button: {
		backgroundColor: "#7B5EFF",
		paddingVertical: 14,
		borderRadius: 10,
		alignItems: "center",
	},
	buttonDisabled: {
		backgroundColor: "rgba(123, 94, 255, 0.4)",
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
	},
});

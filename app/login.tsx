import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
	const router = useRouter();

	const handleLoginPress = () => {
		router.replace("/home");
	};

	return (
		<LinearGradient
			colors={["rgba(72, 52, 169, 0.75)", "rgba(69, 72, 166, 0.75)"]}
			style={{ flex: 1 }}>
			<SafeAreaView style={styles.container}>
				<View style={styles.logInContainer}>
					<View style={styles.logInContentContainer}>
						<Text style={styles.title}>Welcome Back</Text>
						<Text style={styles.subtitle}>Log in to your dream journal</Text>

						<TextInput
							style={styles.inputBox}
							placeholder="Email"
							placeholderTextColor="#aaa"
						/>

						<TextInput
							style={styles.inputBox}
							placeholder="Password"
							placeholderTextColor="#aaa"
							secureTextEntry
						/>

						<TouchableOpacity style={styles.button} onPress={handleLoginPress}>
							<Text style={styles.buttonText}>Log In</Text>
						</TouchableOpacity>

						<View style={{ flexDirection: "row", justifyContent: "center", marginTop: 16 }}>
							<Text style={styles.helperText}>Don't have an account? </Text>
							<TouchableOpacity onPress={() => router.replace("/SignUp")}>
								<Text style={[styles.helperText, { color: "#7B5EFF", fontWeight: "bold" }]}>Sign up</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				
			</SafeAreaView>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	logInContainer: {
		width: "90%",
		backgroundColor: "rgba(0, 10, 69, 0.5)",
		borderRadius: 32,
		marginHorizontal: 12,
		marginBottom: 32,
		paddingVertical: 28,
		paddingHorizontal: 8,
		alignItems: "center",
	},
	logInContentContainer: {
		width: "90%",
		maxWidth: 400,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#fff",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: "#ccc",
		marginBottom: 24,
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
		marginBottom: 16,
	},
	button: {
		backgroundColor: "#7B5EFF",
		paddingVertical: 14,
		borderRadius: 12,
		alignItems: "center",
		marginTop: 8,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 16,
	},
	helperText: {
		color: "#aaa",
		textAlign: "center",
		marginTop: 16,
		fontSize: 13,
	},
});

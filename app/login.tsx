import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLoginPress = () => {
		console.log("Login attempted:", email, password);
		router.replace("/home");
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<Text style={styles.title}>Welcome Back</Text>
				<Text style={styles.subtitle}>Log in to your dream journal</Text>

				<TextInput
					placeholder="Email"
					placeholderTextColor="#aaa"
					value={email}
					onChangeText={setEmail}
					style={styles.input}
					keyboardType="email-address"
					autoCapitalize="none"
				/>

				<TextInput
					placeholder="Password"
					placeholderTextColor="#aaa"
					value={password}
					onChangeText={setPassword}
					style={styles.input}
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
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#2C1E57",
		justifyContent: "center",
		alignItems: "center",
	},
	wrapper: {
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
	input: {
		backgroundColor: "#3D2A74",
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: 14,
		fontSize: 16,
		color: "#fff",
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

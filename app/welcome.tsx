import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type RootStackParamList = {
	Login: undefined;
	SignUp: undefined;
	// add other routes if needed
};

export const unstable_settings = {
	initialRouteName: "welcome",
};

type WelcomeScreenProps = {
	navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar hidden />
			<View style={styles.card}>
				<Image source={require("../assets/images/logo.svg")} style={{ width: 100, height: 100 }} />

				<Text style={styles.title}>Lucidia</Text>

				<TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
					<Text style={styles.loginText}>Log In</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate("SignUp")}>
					<Text style={styles.createText}>Create Account</Text>
				</TouchableOpacity>
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
	card: {
		backgroundColor: "#3D2A74",
		borderRadius: 20,
		padding: 30,
		width: "80%",
		alignItems: "center",
		shadowColor: "#000",
		shadowOpacity: 0.3,
		shadowRadius: 10,
		elevation: 10,
	},
	title: {
		fontSize: 32,
		color: "white",
		fontWeight: "600",
		marginVertical: 20,
		fontFamily: "sans-serif-medium",
	},
	loginButton: {
		backgroundColor: "#7B5EFF",
		borderRadius: 10,
		paddingVertical: 12,
		paddingHorizontal: 40,
		marginTop: 20,
		width: "100%",
		alignItems: "center",
	},
	loginText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	createButton: {
		borderColor: "#9C8CFF",
		borderWidth: 1,
		borderRadius: 10,
		paddingVertical: 12,
		paddingHorizontal: 40,
		marginTop: 15,
		width: "100%",
		alignItems: "center",
	},
	createText: {
		color: "#D0C5FF",
		fontSize: 16,
	},
});

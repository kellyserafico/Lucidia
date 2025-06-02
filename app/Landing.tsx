import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Landing() {
	const router = useRouter();
	const [showUserPage, setshowUserPage] = useState(false);
	const titleFadeStart = useRef(new Animated.Value(1)).current;
	const titleFadeUpStart = useRef(new Animated.Value(0)).current;
	const userPageFadeStart = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const timeout = setTimeout(() => {
			Animated.parallel([
				Animated.timing(titleFadeStart, {
					toValue: 0,
					duration: 200,
					useNativeDriver: true,
				}),
				Animated.timing(titleFadeUpStart, {
					toValue: -50,
					duration: 500,
					useNativeDriver: true,
				}),
			]).start(() => {
				setshowUserPage(true);
				Animated.timing(userPageFadeStart, {
					toValue: 1,
					duration: 500,
					useNativeDriver: true,
				}).start();
			});
		}, 1000);
		return () => clearTimeout(timeout);
	});

	return (
		<LinearGradient
			colors={["rgba(72, 52, 169, 0.75)", "rgba(69, 72, 166, 0.75)"]}
			style={{ flex: 1 }}>
			<View style={styles.container}>
				{!showUserPage && (
					<Animated.View
						style={{
							opacity: titleFadeStart,
							transform: [{ translateY: titleFadeUpStart }],
							position: "absolute",
							width: "100%",
							alignItems: "center",
						}}
					>
						<Text style={styles.welcome}>Welcome to</Text>
						<Text style={styles.lucidia}>Lucidia</Text>
					</Animated.View>
				)}

				{showUserPage && (
					<Animated.View style={[styles.userPageCard, { opacity: userPageFadeStart }]}>
						<Image source={require("../assets/images/akar-icons_moon.png")} style={{ width: 80, height: 80, marginBottom: 16 }} />
						<Text style={styles.lucidiaCard}>Lucidia</Text>

						<TouchableOpacity style={styles.loginBtn} activeOpacity={0.8} onPress={() => router.push("/login")}>
							<Text style={styles.loginBtnText}>Log In</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.createBtn} activeOpacity={0.8} onPress={() => router.push("/SignUp")}>
							<Text style={styles.createBtnText}>Create Account</Text>
						</TouchableOpacity>
					</Animated.View>
				)}
			</View>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	welcome: {
		color: "white",
		fontSize: 32,
		textAlign: "center",
		fontWeight: "300",
		marginBottom: 8,
		fontFamily: "System",
	},

	lucidia: {
		color: "white",
		fontSize: 56,
		textAlign: "center",
		fontFamily: "ShortStack",
	},

	userPageCard: {
		width: "90%",
		maxWidth: 400,
		backgroundColor: "rgba(0, 10, 69, 0.5)",
		borderRadius: 32,
		alignItems: "center",
		paddingVertical: 40,
		paddingHorizontal: 20,
	},

	lucidiaCard: {
		color: "white",
		fontSize: 48,
		fontFamily: "ShortStack",
		marginBottom: 32,
		marginTop: 8,
	},

	loginBtn: {
		width: "100%",
		backgroundColor: "#6B5DD3",
		borderRadius: 8,
		paddingVertical: 14,
		alignItems: "center",
		marginBottom: 18,
	},

	loginBtnText: {
		color: "white",
		fontSize: 18,
		fontWeight: "400",
	},

	createBtn: {
		width: "100%",
		borderColor: "#B6A8F7",
		borderWidth: 1.5,
		borderRadius: 8,
		paddingVertical: 14,
		alignItems: "center",
	},

	createBtnText: {
		color: "white",
		fontSize: 18,
		fontWeight: "400",
	},
});

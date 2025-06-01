import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

export default function SearchScreen() {
  const [query, setQuery] = useState("");

  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const weekday = now.toLocaleDateString("en-US", { weekday: "long" });
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <Text style={styles.timeText}>{`${weekday} | ${time}`}</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#aaa"
          value={query}
          onChangeText={setQuery}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C1E57", // purple background
    paddingTop: 40,
  },
  contentWrapper: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    paddingHorizontal: 24,
  },
  dateText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  timeText: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 24,
  },
  searchInput: {
    backgroundColor: "#3D2A74",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
});

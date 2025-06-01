import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { entries } from '../../constants/entries';

export default function EditTextScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const entry = entries.find(e => e.id === id);
  const [text, setText] = useState(entry ? entry.text : '');

  if (!entry) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.date}>Entry not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={64}
      >
        <View style={styles.contentWrapper}>
          {/* Header */}
          <Text style={styles.date}>{entry.date}</Text>
          <Text style={styles.dayTime}>{entry.dayTime}</Text>

          {/* Text Input Card */}
          <View style={styles.card}>
            <TextInput
              style={styles.textInput}
              value={text}
              onChangeText={setText}
              multiline
              placeholder="Type your dream entry here..."
              placeholderTextColor="#bbb"
              textAlignVertical="top"
              autoFocus={false}
            />
          </View>
        </View>
        {/* Next Button (absolute at bottom) */}
        <View style={styles.nextBtnContainer}>
          <TouchableOpacity style={styles.nextBtn} onPress={() => router.back()}>
            <Text style={styles.nextBtnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B378D',
    paddingHorizontal: 0,
  },
  contentWrapper: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  date: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
    marginLeft: 2,
  },
  dayTime: {
    color: '#d6d6f7',
    fontSize: 16,
    marginBottom: 18,
    marginLeft: 2,
  },
  card: {
    backgroundColor: '#2D2266',
    borderRadius: 18,
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 8,
    minHeight: 220,
  },
  textInput: {
    color: '#fff',
    fontSize: 16,
    minHeight: 180,
    maxHeight: 320,
    textAlignVertical: 'top',
    padding: 0,
  },
  nextBtnContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 56,
    width: '100%',
    zIndex: 10,
    paddingHorizontal: 24,
  },
  nextBtn: {
    backgroundColor: '#7B5EFF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginHorizontal: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  nextBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
}); 
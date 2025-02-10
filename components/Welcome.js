import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { Baloo_400Regular } from '@expo-google-fonts/baloo';

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.welcomeText}>Welcome</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  welcomeText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#3498db', // Bright color for the bubbly effect
    textShadowColor: '#ff6347', // Shadow for depth
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 10, // Adds mo
  },
});

export default Welcome;

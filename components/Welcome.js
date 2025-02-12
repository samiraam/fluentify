import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'; // Added Image import
import { useFonts } from 'expo-font';
import { Baloo_400Regular } from '@expo-google-fonts/baloo';

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CenteredImage /> {/* The image stays in the background */}
      {/* The "Welcome" text is now the button and will navigate to 'Home' */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.textButton}>
        <Text style={styles.welcomeText}>Welcome</Text>
      </TouchableOpacity>
    </View>
  );
};

const CenteredImage = () => {
  return (
    <View style={styles.imageContainer}>
      {/* Correct way to use a local image */}
      <Image
        source={require('../assets/images/bubble.jpg')} // Use require for local images
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Background color for the whole container
    position: 'relative', // Keeps everything inside relative to the container
  },
  welcomeText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#3498db', // Bright color for the bubbly effect
    textShadowColor: '#ff6347', // Shadow for depth
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 10, // Adds more depth to the shadow
    zIndex: 1, // Ensure the text stays on top of the image
  },
  textButton: {
    position: 'absolute',
    zIndex: 1, // Ensure the text is on top of the image
    top: '40%', // Adjust the text's vertical position (centered)
    alignItems: 'center',
  },
  imageContainer: {
    position: 'absolute', // Place the image behind everything
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0, // Ensure the image stays in the background
  },
  image: {
    width: '100%', // Adjust image size to fill the screen width
    height: '100%', // Adjust image size to fill the screen height
    opacity: 0.6, // Optional: make the image a bit transparent
  },
});

export default Welcome;

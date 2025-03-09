import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getWordDefinition, getSynonyms } from './wordnikApi.js'; // Correct import path

const Home = () => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState(null);
  const [synonyms, setSynonyms] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (word.trim()) {
      setError(''); // Clear any previous errors
      setDefinition(null); // Reset definition
      setSynonyms(null); // Reset synonyms

      // Fetch the word definition
      const definitionData = await getWordDefinition(word.trim());
      if (definitionData) {
        setDefinition(definitionData);
      } else {
        setError('Word not found.');
        setDefinition(null);
        setSynonyms(null);
      }

      // Fetch synonyms
      const synonymsData = await getSynonyms(word.trim());
      setSynonyms(synonymsData);
    } else {
      setError('Please enter a word.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Wordnik Dictionary Search</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a word"
        value={word}
        onChangeText={setWord}
      />
      <Button title="Search" onPress={handleSearch} />

      {definition && <Text style={styles.result}>Definition: {definition}</Text>}
      {synonyms && <Text style={styles.result}>Synonyms: {synonyms}</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    color: 'green',
  },
  error: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
});

export default Home;

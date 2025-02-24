import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getWordDefinition, getSynonyms } from './oxfordApi';  // Import both functions

const Home = () => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState(null);
  const [synonyms, setSynonyms] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (word.trim()) {
      setError('');
      const data = await getWordDefinition(word.trim());
      if (data && data.results && data.results.length > 0) {
        const definition = data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
        setDefinition(definition);

        // Fetch synonyms as well
        const synonyms = await getSynonyms(word.trim());
        setSynonyms(synonyms);
      } else {
        setError('Word not found.');
        setDefinition(null);
        setSynonyms(null);
      }
    } else {
      setError('Please enter a word.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Oxford Dictionary Search</Text>
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

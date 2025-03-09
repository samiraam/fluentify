import axios from 'axios';

// Wordnik API details
const API_KEY = 'x0pse793q7ohl1afc8oxx16uvdsxdpvufgkyjl8hjm7z8a274';  // Use your real API key here
const BASE_URL = 'https://api.wordnik.com/v4/word.json/';

// Function to get word definitions
export const getWordDefinition = async (word) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${word}/definitions`,
      {
        params: {
          api_key: API_KEY,
          limit: 1, // Limit to 1 definition
          partOfSpeech: 'noun', // Filter for nouns (optional)
        },
      }
    );

    if (response.data.length > 0) {
      return response.data[0].text; // Return first definition
    } else {
      return null;  // Return null if no definition found
    }
  } catch (error) {
    console.error('Error fetching definition:', error);
    return null;  // Return null on error
  }
};

// Function to get synonyms
export const getSynonyms = async (word) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${word}/relatedWords`,
      {
        params: {
          api_key: API_KEY,
          relationshipTypes: 'synonym', // Only get synonyms
        },
      }
    );

    if (response.data.length > 0) {
      // Find synonyms from the API response
      const synonyms = response.data.find(item => item.relationshipType === 'synonym');
      return synonyms ? synonyms.words.join(', ') : 'No synonyms found';
    } else {
      return 'No synonyms found';  // Return message if no synonyms found
    }
  } catch (error) {
    console.error('Error fetching synonyms:', error);
    return 'Error fetching synonyms';  // Return error message on error
  }
};

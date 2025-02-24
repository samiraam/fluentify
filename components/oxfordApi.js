import axios from 'axios';

// Replace with your actual API Key and API URL
const APP_ID = 'a56dc78b';  // You get this from Oxford API Dashboard
const APP_KEY = '	f1cd1317c09aacfcf40f2744bc258298';  // You get this from Oxford API Dashboard
const API_URL = 'https://od-api-sandbox.oxforddictionaries.com/api/v2';

// Function to get the definition of a word
export const getWordDefinition = async (word) => {
  try {
    const response = await fetch(`${API_URL}/entries/en-us/${word.toLowerCase()}`, {
      method: 'GET',
      headers: {
        'app_id': APP_ID,
        'app_key': APP_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch word definition');
    }

    const data = await response.json(); // Convert the response to JSON
    console.log(data); // Log the response for debugging
    console.log('https://od-api-sandbox.oxforddictionaries.com/api/v2', data);
    return data;
  } catch (error) {
    console.error('Error fetching word definition: ', error);
    return null;
  }
};

// Function to get synonyms of a word
export const getSynonyms = async (word) => {
  try {
    const data = await getWordDefinition(word);

    if (data && data.results && data.results.length > 0) {
      const synonyms = data.results[0].lexicalEntries[0].entries[0].senses[0].synonyms;
      if (synonyms) {
        return synonyms.map((syn) => syn.text).join(', ');
      } else {
        return 'No synonyms found.';
      }
    } else {
      return 'No data found for this word.';
    }
  } catch (error) {
    console.error('Error fetching synonyms: ', error);
    return 'Error fetching synonyms';
  }
};

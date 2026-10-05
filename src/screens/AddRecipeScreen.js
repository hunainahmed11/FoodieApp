import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

import { useRecipeContext } from '../context/RecipeContext';

export default function AddRecipeScreen() {
  const navigation = useNavigation();
  const { addRecipe } = useRecipeContext();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');
  const [instructionsText, setInstructionsText] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [servings, setServings] = useState('');
  const [calories, setCalories] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');

  const pickRecipeImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permission needed', 'Please allow access to your photos to choose a recipe image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveRecipe = () => {
    const trimmedName = name.trim();
    const ingredients = ingredientsText
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);
    const instructions = instructionsText
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

    if (!trimmedName || ingredients.length === 0 || instructions.length === 0) {
      Alert.alert('Missing information', 'Recipe Name, Ingredients, and Instructions are required.');
      return;
    }

    const newRecipe = {
      id: Date.now().toString(),
      name: trimmedName,
      category: 'My Food',
      image: image || 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
      ingredients,
      instructions,
      prepTime: prepTime || 'Not specified',
      servings: servings ? Number(servings) : 0,
      calories: calories ? Number(calories) : 0,
      difficulty: difficulty || 'Easy',
    };

    addRecipe(newRecipe);
    Alert.alert('Success', 'Recipe saved successfully.');
    navigation.navigate('MyRecipes');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Add New Recipe</Text>

        <Text style={styles.label}>Recipe Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter recipe name"
          style={styles.input}
        />

        <TouchableOpacity style={styles.imageButton} onPress={pickRecipeImage}>
          <Text style={styles.imageButtonText}>Choose Recipe Image</Text>
        </TouchableOpacity>

        {image ? (
          <Image source={{ uri: image }} style={styles.previewImage} resizeMode="cover" />
        ) : null}

        <Text style={styles.label}>Ingredients</Text>
        <TextInput
          value={ingredientsText}
          onChangeText={setIngredientsText}
          placeholder={'Rice\nChicken\nYogurt\nSpices'}
          multiline
          numberOfLines={6}
          style={[styles.input, styles.textArea]}
        />

        <Text style={styles.label}>Step-by-Step Instructions</Text>
        <TextInput
          value={instructionsText}
          onChangeText={setInstructionsText}
          placeholder={'Wash the rice\nCook the chicken\nBoil the rice\nLayer and serve'}
          multiline
          numberOfLines={6}
          style={[styles.input, styles.textArea]}
        />

        <Text style={styles.label}>Preparation Time</Text>
        <TextInput
          value={prepTime}
          onChangeText={setPrepTime}
          placeholder="e.g. 30 minutes"
          style={styles.input}
        />

        <Text style={styles.label}>Servings</Text>
        <TextInput
          value={servings}
          onChangeText={setServings}
          placeholder="e.g. 4"
          keyboardType="numeric"
          style={styles.input}
        />

        <Text style={styles.label}>Calories</Text>
        <TextInput
          value={calories}
          onChangeText={setCalories}
          placeholder="e.g. 450"
          keyboardType="numeric"
          style={styles.input}
        />

        <Text style={styles.label}>Difficulty</Text>
        <View style={styles.difficultyRow}>
          {['Easy', 'Medium', 'Hard'].map((level) => (
            <TouchableOpacity
              key={level}
              style={[styles.difficultyButton, difficulty === level && styles.selectedDifficultyButton]}
              onPress={() => setDifficulty(level)}
            >
              <Text style={[styles.difficultyText, difficulty === level && styles.selectedDifficultyText]}>
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveRecipe}>
          <Text style={styles.saveButtonText}>Save Recipe</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 16,
    color: '#1F1F1F',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
    color: '#1F1F1F',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  imageButton: {
    marginTop: 16,
    backgroundColor: '#F4EFEA',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#FF6B35',
    fontWeight: '700',
  },
  previewImage: {
    width: '100%',
    height: 180,
    marginTop: 12,
    borderRadius: 14,
  },
  difficultyRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  difficultyButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  selectedDifficultyButton: {
    backgroundColor: '#FF6B35',
  },
  difficultyText: {
    fontWeight: '600',
    color: '#333',
  },
  selectedDifficultyText: {
    color: '#FFF',
  },
  saveButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 14,
    marginTop: 22,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
});

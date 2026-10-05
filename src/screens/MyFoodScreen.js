import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MyFoodScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Food</Text>

      <View style={styles.optionList}>
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => navigation.navigate('AddRecipe')}
        >
          <Text style={styles.optionTitle}>Add New Recipe</Text>
          <Text style={styles.optionText}>Create your own delicious recipe.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => navigation.navigate('MyRecipes')}
        >
          <Text style={styles.optionTitle}>My Recipes</Text>
          <Text style={styles.optionText}>View and manage your saved recipes.</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 20,
    color: '#1F1F1F',
  },
  optionList: {
    gap: 16,
  },
  optionCard: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 22,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  optionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F1F1F',
  },
  optionText: {
    marginTop: 8,
    fontSize: 15,
    color: '#666',
  },
});

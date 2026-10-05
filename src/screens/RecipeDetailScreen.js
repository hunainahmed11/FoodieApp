import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRecipeContext } from '../context/RecipeContext';

export default function RecipeDetailScreen({ route }) {
  const { recipe } = route.params || {};
  const { favoriteIds, toggleFavorite } = useRecipeContext();

  if (!recipe) {
    return (
      <View style={styles.emptyState}>
        <Text>No recipe selected.</Text>
      </View>
    );
  }

  const isFavorite = favoriteIds.includes(recipe.id);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Image source={{ uri: recipe.image }} style={styles.image} resizeMode="cover" />

      <View style={styles.headerRow}>
        <View style={styles.titleWrap}>
          <Text style={styles.recipeName}>{recipe.name}</Text>
          <Text style={styles.category}>{recipe.category}</Text>
        </View>

        <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(recipe.id)}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={26}
            color={isFavorite ? '#FF5B5B' : '#111'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.metaGrid}>
        <View style={styles.metaCard}>
          <Text style={styles.metaLabel}>Prep Time</Text>
          <Text style={styles.metaValue}>{recipe.prepTime}</Text>
        </View>
        <View style={styles.metaCard}>
          <Text style={styles.metaLabel}>Servings</Text>
          <Text style={styles.metaValue}>{recipe.servings}</Text>
        </View>
        <View style={styles.metaCard}>
          <Text style={styles.metaLabel}>Calories</Text>
          <Text style={styles.metaValue}>{recipe.calories}</Text>
        </View>
        <View style={styles.metaCard}>
          <Text style={styles.metaLabel}>Difficulty</Text>
          <Text style={styles.metaValue}>{recipe.difficulty}</Text>
        </View>
      </View>

      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={`${ingredient}-${index}`} style={styles.listItem}>
            • {ingredient}
          </Text>
        ))}
      </View>

      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        {recipe.instructions.map((step, index) => (
          <Text key={`${step}-${index}`} style={styles.listItem}>
            {index + 1}. {step}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  contentContainer: {
    paddingBottom: 28,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 260,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  titleWrap: {
    flex: 1,
    paddingRight: 12,
  },
  recipeName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F1F1F',
  },
  category: {
    color: '#FF6B35',
    marginTop: 6,
    fontWeight: '700',
  },
  favoriteButton: {
    backgroundColor: '#FFF',
    borderRadius: 50,
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 18,
    marginTop: 18,
  },
  metaCard: {
    width: '48%',
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    marginRight: '2%',
  },
  metaLabel: {
    color: '#777',
    fontSize: 12,
  },
  metaValue: {
    marginTop: 6,
    fontWeight: '700',
    color: '#1F1F1F',
  },
  sectionBox: {
    backgroundColor: '#FFF',
    marginHorizontal: 18,
    marginTop: 18,
    padding: 16,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#1F1F1F',
  },
  listItem: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
    marginBottom: 6,
  },
});

import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import RecipeCard from '../components/RecipeCard';
import { useRecipeContext } from '../context/RecipeContext';

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const { allRecipes, favoriteIds, toggleFavorite } = useRecipeContext();

  const favoriteRecipes = allRecipes.filter((recipe) => favoriteIds.includes(recipe.id));

  return (
    <SafeAreaView style={styles.container}>
      {favoriteRecipes.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No favorite recipes yet.</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteRecipes}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              isFavorite={true}
              onToggleFavorite={() => toggleFavorite(item.id)}
              onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  listContent: {
    padding: 18,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});

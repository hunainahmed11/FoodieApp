import React, { useMemo, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CategoryList from '../components/CategoryList';
import RecipeCard from '../components/RecipeCard';
import { categoryOptions } from '../data/recipes';
import { useRecipeContext } from '../context/RecipeContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { allRecipes, favoriteIds, toggleFavorite } = useRecipeContext();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchText, setSearchText] = useState('');

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter((recipe) => {
      const matchesCategory =
        selectedCategory === 'All' ? true : recipe.category === selectedCategory;
      const matchesSearch = recipe.name
        .toLowerCase()
        .includes(searchText.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allRecipes, searchText, selectedCategory]);

  const handleCategoryPress = (category) => {
    if (category === 'My Food') {
      setSelectedCategory('All');
      navigation.navigate('MyFood');
      return;
    }

    setSelectedCategory(category);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Foodie</Text>
            <Text style={styles.subtitle}>Discover delicious recipes</Text>
          </View>

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => navigation.navigate('Favorites')}
          >
            <Text style={styles.favoriteButtonText}>Favorites</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Search recipes"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />

        {/* Horizontal list with 10+ recipe categories */}
        <CategoryList
          categories={categoryOptions}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryPress}
        />

        <Text style={styles.sectionTitle}>Featured Recipes</Text>

        <FlatList
          data={filteredRecipes}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              isFavorite={favoriteIds.includes(item.id)}
              onToggleFavorite={() => toggleFavorite(item.id)}
              onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No recipes found for this category.</Text>
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1F1F1F',
  },
  subtitle: {
    color: '#666',
    fontSize: 15,
    marginTop: 4,
  },
  favoriteButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  favoriteButtonText: {
    fontWeight: '700',
    color: '#FFF',
  },
  searchInput: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginHorizontal: 20,
    marginBottom: 12,
    color: '#1F1F1F',
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: 20,
    color: '#666',
  },
});

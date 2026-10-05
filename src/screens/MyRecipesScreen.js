import React from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useRecipeContext } from '../context/RecipeContext';

export default function MyRecipesScreen() {
  const navigation = useNavigation();
  const { customRecipes, deleteRecipe } = useRecipeContext();

  const handleDelete = (recipe) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this recipe?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteRecipe(recipe.id),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {customRecipes.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No recipes added yet.</Text>
        </View>
      ) : (
        <FlatList
          data={customRecipes}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}>
                <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
                <Text style={styles.name}>{item.name}</Text>
              </TouchableOpacity>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => navigation.navigate('EditRecipe', { recipe: item })}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#1F1F1F',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    borderRadius: 10,
    paddingVertical: 10,
    marginRight: 8,
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#D94B4B',
    borderRadius: 10,
    paddingVertical: 10,
    marginLeft: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '700',
  },
});

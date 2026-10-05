import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RecipeCard({ recipe, isFavorite, onToggleFavorite, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: recipe.image }} style={styles.image} resizeMode="cover" />

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={onToggleFavorite}
        activeOpacity={0.8}
      >
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={22}
          color={isFavorite ? '#FF5B5B' : '#FFFFFF'}
        />
      </TouchableOpacity>

      <View style={styles.detailContainer}>
        <Text style={styles.name}>{recipe.name}</Text>
        <Text style={styles.category}>{recipe.category}</Text>
        <Text style={styles.meta}>{recipe.prepTime}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 190,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.35)',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailContainer: {
    padding: 14,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F1F1F',
  },
  category: {
    marginTop: 6,
    color: '#FF6B35',
    fontWeight: '600',
  },
  meta: {
    marginTop: 8,
    color: '#666',
    fontSize: 13,
  },
});

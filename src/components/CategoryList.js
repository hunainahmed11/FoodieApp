import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CategoryList({ categories, selectedCategory, onSelectCategory }) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category;

          return (
            <TouchableOpacity
              key={category}
              style={[styles.categoryButton, isSelected && styles.selectedCategoryButton]}
              onPress={() => onSelectCategory(category)}
            >
              <Text style={[styles.categoryText, isSelected && styles.selectedCategoryText]}>
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    marginRight: 10,
  },
  selectedCategoryButton: {
    backgroundColor: '#FF6B35',
  },
  categoryText: {
    color: '#333',
    fontWeight: '600',
  },
  selectedCategoryText: {
    color: '#FFF',
  },
});

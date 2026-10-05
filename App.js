import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RecipeProvider } from './src/context/RecipeContext';
import HomeScreen from './src/screens/HomeScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import MyFoodScreen from './src/screens/MyFoodScreen';
import AddRecipeScreen from './src/screens/AddRecipeScreen';
import MyRecipesScreen from './src/screens/MyRecipesScreen';
import EditRecipeScreen from './src/screens/EditRecipeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RecipeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RecipeDetail"
            component={RecipeDetailScreen}
            options={{ title: 'Recipe Details' }}
          />
          <Stack.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{ title: 'Favorites' }}
          />
          <Stack.Screen
            name="MyFood"
            component={MyFoodScreen}
            options={{ title: 'My Food' }}
          />
          <Stack.Screen
            name="AddRecipe"
            component={AddRecipeScreen}
            options={{ title: 'Add New Recipe' }}
          />
          <Stack.Screen
            name="MyRecipes"
            component={MyRecipesScreen}
            options={{ title: 'My Recipes' }}
          />
          <Stack.Screen
            name="EditRecipe"
            component={EditRecipeScreen}
            options={{ title: 'Edit Recipe' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RecipeProvider>
  );
}

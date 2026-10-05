import React, { createContext, useContext, useMemo, useState } from 'react';
import { sampleRecipes } from '../data/recipes';

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [customRecipes, setCustomRecipes] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);

  const allRecipes = useMemo(() => [...sampleRecipes, ...customRecipes], [customRecipes]);

  const toggleFavorite = (recipeId) => {
    setFavoriteIds((currentIds) =>
      currentIds.includes(recipeId)
        ? currentIds.filter((id) => id !== recipeId)
        : [...currentIds, recipeId]
    );
  };

  const addRecipe = (recipe) => {
    setCustomRecipes((currentRecipes) => [recipe, ...currentRecipes]);
  };

  const updateRecipe = (updatedRecipe) => {
    setCustomRecipes((currentRecipes) =>
      currentRecipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
  };

  const deleteRecipe = (recipeId) => {
    setCustomRecipes((currentRecipes) =>
      currentRecipes.filter((recipe) => recipe.id !== recipeId)
    );
    setFavoriteIds((currentIds) =>
      currentIds.filter((id) => id !== recipeId)
    );
  };

  return (
    <RecipeContext.Provider
      value={{
        sampleRecipes,
        customRecipes,
        allRecipes,
        favoriteIds,
        toggleFavorite,
        addRecipe,
        updateRecipe,
        deleteRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipeContext() {
  return useContext(RecipeContext);
}

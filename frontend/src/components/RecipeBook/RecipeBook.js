import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Spinner from 'react-bootstrap/Spinner';

import axios from 'axios';

function RecipeBook() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function getRecipes() {
    setIsLoading(true);
    return axios
      .get(`/api/recipes`)
      .then((res) => {
        const recipes = [];
        res.data.forEach((recipe) => {
          recipes.push(JSON.parse(recipe));
        });
        setRecipes(recipes);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getRecipes();
  }, recipes);

  function openRecipe(path) {
    navigate(`/recipes/${path}`);
  }

  return (
    <>
      {isLoading && (
        <>
          <Spinner animation="border" className="spinner" />
          <div className="background-transparent"></div>
        </>
      )}
      {recipes.map((recipe) => (
        <div onClick={() => openRecipe(recipe.path)}>{recipe.name}</div>
      ))}
    </>
  );
}

export default RecipeBook;

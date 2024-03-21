import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import axios from 'axios';

function RecipeBook() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  async function getRecipes() {
    setIsLoading(true);
    return axios
      .get(`/api/recipes`)
      .then((res) => {
        console.log(res);
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

  return (
    <>
      {isLoading && (
        <>
          <Spinner animation="border" className="spinner" />
          <div className="background-transparent"></div>
        </>
      )}
      {recipes.map((recipe) => recipe.name)}
    </>
  );
}

export default RecipeBook;

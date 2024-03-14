import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Ingredient from '../Ingredient/Ingredient';
import Step from '../Step/Step';

import './Recipe.css';

function Recipe() {
  const [recipeName, setRecipeName] = useState(null);
  const [steps, setSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  let { recipeID } = useParams();

  useEffect(() => {
    var json = '';
    try {
      json = require(`../../../data/recipes/${recipeID}.json`);
    } catch (e) {
      console.error(`could not find recipe ${recipeID}`);
    }

    if (json == null) {
      return;
    }

    setRecipeName(json.name);

    const intermediateIngredients = [];
    const intermediateSteps = [];
    json.ingredients.forEach((ingredient) => {
      var ingredientJSON = require(`../../../data/ingredients/${ingredient.id}.json`);
      intermediateIngredients.push(ingredientJSON);
    });

    json.steps.forEach((step) => {
      intermediateSteps.push(step);
    });

    setIngredients(() => intermediateIngredients);
    setSteps(() => intermediateSteps);
  }, [recipeID]);

  if (recipeName === '') {
    return <>Recipe: Not Found</>;
  }

  return (
    <>
      <div className="recipe">Recipe: {recipeName}</div>
      <div className="ingredients">
        Ingredients:
        {ingredients.map((ingredient) => {
          return <Ingredient key={ingredient.id} ingredient={ingredient} />;
        })}
      </div>
      <div className="steps">
        Steps:
        {steps.map((step) => {
          return <Step step={step} />;
        })}
      </div>
    </>
  );
}

export default Recipe;

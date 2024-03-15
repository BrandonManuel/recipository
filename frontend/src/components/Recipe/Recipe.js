import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import Ingredient from '../Ingredient/Ingredient';
import Step from '../Step/Step';

import './Recipe.css';

function Recipe() {
  const [recipeName, setRecipeName] = useState('');
  const [steps, setSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  let { recipeID } = useParams();

  useEffect(() => {
    let ignore = false;
    var json = null;

    axios
      .get(`/api/recipes/${recipeID}`)
      .then((res) => {
        if (!ignore) {
          json = res.data;
        }

        if (json == null) {
          return;
        }

        console.log(json);
        setRecipeName(json.name);

        const intermediateIngredients = [];
        const intermediateSteps = [];
        json.ingredients.forEach((ingredient) => {
          var ingredientJSON = require(`../../../../backend/data/ingredients/${ingredient.id}.json`);
          intermediateIngredients.push(ingredientJSON);
        });

        json.steps.forEach((step) => {
          intermediateSteps.push(step);
        });

        console.log('setting intermediate stuff');
        console.log(intermediateIngredients);
        console.log(intermediateSteps);
        setIngredients(() => intermediateIngredients);
        setSteps(() => intermediateSteps);
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      ignore = true;
    };
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
        {steps.map((step, i) => {
          return (
            <Step key={step.id} step={step} recipeID={recipeID} stepNum={i} />
          );
        })}
      </div>
    </>
  );
}

export default Recipe;

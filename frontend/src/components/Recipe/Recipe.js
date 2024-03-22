import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

import axios from 'axios';

import Ingredient from '../Ingredient/Ingredient';
import Step from '../Step/Step';

import './Recipe.css';

function Recipe() {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [json, setJson] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  let { recipeID } = useParams();

  useEffect(() => {
    let ignore = false;

    getRecipe(recipeID).then((res) => {
      if (!ignore) {
        setJson(res.data);
        setRecipeName(res.data.name);
      }
    });

    return () => {
      ignore = true;
    };
  }, [recipeID]);

  async function waitForAndSetIngredients(ingredientsPromises) {
    setIsLoading(true);
    console.log('in waitForAndSetIngredients');
    await Promise.all(ingredientsPromises).then((ingredients) => {
      setIngredients(ingredients);
      setIsLoading(false);
    });
  }

  async function getRecipe(recipeID) {
    setIsLoading(true);
    console.log('sending ' + recipeID);
    return axios
      .get(`/api/recipes/${recipeID}`)
      .then((res) => {
        var ingredientPromises = [];
        res.data.ingredients.forEach((ingredient) => {
          ingredientPromises.push(getIngredient(ingredient.id));
          waitForAndSetIngredients(ingredientPromises);
        });
        return res;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getIngredient(ingredientID) {
    const ingredientResponse = axios
      .get(`/api/ingredients/${ingredientID}`)
      .then((res) => {
        return res.data;
      });

    return ingredientResponse;
  }

  function saveStep(recipeID, stepNum, stepText) {
    var step = json.steps[stepNum];
    step.text = stepText;

    setJson((json) => ({ ...json, ...step }));
    setIsLoading(true);
    axios
      .post(`/api/recipes/${recipeID}`, json)
      .then((res) => {
        console.log(res.data);
        setJson(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      {isLoading && (
        <>
          <Spinner animation="border" className="spinner" />
          <div className="background-transparent"></div>
        </>
      )}
      {recipeName == '' ||
      json == null ||
      json.steps == null ||
      ingredients == null ||
      ingredients.length == 0 ? (
        <></>
      ) : (
        <>
          <div className="recipe">Recipe: {recipeName}</div>
          <div className="ingredients">
            Ingredients:
            {ingredients.map((ingredient) => {
              console.log(ingredient);
              return <Ingredient key={ingredient.id} ingredient={ingredient} />;
            })}
          </div>
          <div className="steps">
            Steps:
            {json.steps.map((step, i) => {
              return (
                <Step
                  key={step.id}
                  step={step}
                  recipeID={recipeID}
                  stepNum={i}
                  saveStep={saveStep}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default Recipe;

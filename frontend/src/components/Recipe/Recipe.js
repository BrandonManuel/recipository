import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import Ingredient from '../Ingredient/Ingredient';
import Step from '../Step/Step';

import './Recipe.css';

function Recipe() {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [json, setJson] = useState(null);

  let { recipeID } = useParams();

  useEffect(() => {
    let ignore = false;

    axios
      .get(`/api/recipes/${recipeID}`)
      .then((res) => {
        if (!ignore) {
          setJson(res.data);
        }

        setRecipeName(res.data.name);
        var ingredientPromises = [];
        res.data.ingredients.forEach((ingredient) => {
          ingredientPromises.push(getIngredient(ingredient.id));
          waitForAndSetIngredients(ingredientPromises);
        });
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      ignore = true;
    };
  }, [recipeID]);

  async function waitForAndSetIngredients(ingredientsPromises) {
    var ingredients = await Promise.all(ingredientsPromises);
    setIngredients(() => ingredients);
  }

  async function getIngredient(ingredientID) {
    const ingredientResponse = await axios.get(
      `/api/ingredients/${ingredientID}`
    );

    return ingredientResponse.data;
  }

  function saveStep(recipeID, stepNum, stepText) {
    console.log(json);
    var step = json.steps[stepNum];
    step.text = stepText;

    setJson((json) => ({ ...json, ...step }));

    axios
      .post(`/api/recipes/${recipeID}`, json)
      .then((res) => {
        console.log(res.data);
        setJson(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  if (recipeName === '') {
    return <>Recipe: Not Found</>;
  }

  return json == null || json.steps == null ? (
    <></>
  ) : (
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
  );
}

export default Recipe;

import './Ingredient.css';

function Ingredient({ ingredient }) {
  return <div className="ingredient">Ingredient: {ingredient.name}</div>;
}

export default Ingredient;

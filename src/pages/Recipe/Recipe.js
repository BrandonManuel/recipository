import { useParams } from 'react-router-dom';

function Recipe() {
  let { recipe } = useParams();
  return <>Recipe: {recipe}</>;
}

export default Recipe;

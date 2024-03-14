import React from 'react';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Recipe from './components/Recipe/Recipe';
import NewRecipe from './components/NewRecipe/NewRecipe';
import RecipeBook from './components/RecipeBook/RecipeBook';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {<Route element={<Home />} />}
          {<Route path="/new-recipe" element={<NewRecipe />} />}
          {<Route path="/recipe-book" element={<RecipeBook />} />}
          {<Route path="/recipe/:recipeID" element={<Recipe />} />}
          <Route path="/*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import Recipe from './pages/Recipe/Recipe';
import NewRecipe from './pages/NewRecipe/NewRecipe';
import RecipeBook from './pages/RecipeBook/RecipeBook';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {<Route element={<Home />} />}
          {<Route path="/new-recipe" element={<NewRecipe />} />}
          {<Route path="/recipe-book" element={<RecipeBook />} />}
          {<Route path="/recipe/:recipe" element={<Recipe />} />}
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

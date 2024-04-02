// === REACT ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./Home/Home.tsx";
import Categories from "./Categories/Categories.tsx";
import Content from "./Content/Content.tsx";

import "./index.css";
// === ROUTER ===
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/categories/aphorisms",
    element: <Content />,
  }
]);

// === ROOT ===
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} /> 
  </React.StrictMode>
);


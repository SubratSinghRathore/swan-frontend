import React, { lazy, Suspense } from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "../App.jsx";
const Home = lazy(() => import('./Home.jsx'));
const Gallery = lazy(() => import('./Gallery.jsx'))

export const layout = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />} >
    <Route path="" element={<Suspense fallback={"Hang-on tight loading..."}><Home /></Suspense>} />
    <Route path="gallery" element={<Suspense fallback={"loading..."}><Gallery /></Suspense>} />
  </Route>
))
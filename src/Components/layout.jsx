import React, { lazy, Suspense } from "react";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import App from "../App.jsx";
import UserPage from "./UserPage.jsx";
import Loading from "./Loading.jsx";
const Home = lazy(() => import('./Home.jsx'));
const Gallery = lazy(() => import('./Gallery.jsx'))
const Login = lazy(() => import('./Authantication/Login.jsx'));
const Signup = lazy(() => import('./Authantication/Signup.jsx'));

export const layout = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />} >
    <Route path="" element={<Suspense fallback={<Loading />}><Home /></Suspense>} >
      <Route path="user" element={<UserPage />} />
    </Route>
    <Route path="login" element={<Suspense fallback={<Loading />}><Login /></Suspense>} />
    <Route path="signup" element={<Suspense fallback={<Loading />}><Signup /></Suspense>} />
    <Route path="gallery" element={<Suspense fallback={<Loading />}><Gallery /></Suspense>} />
  </Route>
))
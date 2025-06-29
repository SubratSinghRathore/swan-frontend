import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import App from "../App.jsx";
import Loading from "./Loading.jsx";
import Error from "./Error.jsx";
import User from "../page/user/index.jsx";
const BodyRouts = lazy(() => import("./BodyRouts.jsx"));
const Messages = lazy(() => import("./Messages.comp.jsx"));
const Home = lazy(() => import("./Home.jsx"));
const Gallery = lazy(() => import("./Gallery.jsx"));
const Login = lazy(() => import("./Authantication/Login.jsx"));
const Signup = lazy(() => import("./Authantication/Signup.jsx"));

export const layout = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path=""
        element={
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        }
      >
        <Route
          path="feed"
          element={
            <Suspense fallback={<Loading />}>
              <BodyRouts />
            </Suspense>
          }
        />
        <Route
          path="messages"
          element={
            <Suspense fallback={<Loading />}>
              <Messages />
            </Suspense>
          }
        />
        <Route
          path="gallery"
          element={
            <Suspense fallback={<Loading />}>
              <Gallery />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="user/:id"
        element={
          <Suspense fallback={<Loading />}>
            <User />
          </Suspense>
        }
      />
      <Route
        path="login"
        element={
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="signup"
        element={
          <Suspense fallback={<Loading />}>
            <Signup />
          </Suspense>
        }
      />
      <Route path="*" element={<Error />} />
    </Route>
  )
);

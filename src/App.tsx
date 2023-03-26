import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";

import HomePage from "./pages/HomePage";
import SongPage from "./pages/SongPage";
import ErrorPage from "./pages/ErrorPage";
import DefaultLayout from "./layouts/DefaultLayout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { ColorModeProvider } from "./theme";
import ManagePage from "./pages/ManagePage";
import AllSongsPage from "./pages/AllSongsPage";
import PrivateRoute from "./pages/PrivateRoute";
import { useEffect } from "react";
import { fetchSongs } from "./store/features/songs";
import { useAppDispatch } from "./store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: "/manage",
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <ManagePage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/songs",
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <AllSongsPage /> },
      { path: ":songId", element: <SongPage /> },
    ],
  },
  {
    path: "/auth",
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSongs());
  }, []);

  return (
    <ColorModeProvider>
      <RouterProvider router={router} />
    </ColorModeProvider>
  );
}
export default App;

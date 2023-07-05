import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";

import "./App.css";
import HomePage from "./pages/HomePage";
import NewExpense from "./pages/NewExpense";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorCard />,
    children: [
      { index: true, element: <HomePage /> },
      // {
      //   path: "albums",
      //   element: <AlbumsRootLayout />,
      //   children: [
      //     {
      //       index: true,
      //       element: <AlbumsPage />,
      //       loader: albumPageLoader,
      //     },
      //     {
      //       path: ":albumID",
      //       id: "album-detail",
      //       loader: albumDetailLoader,
      //       children: [
      //         {
      //           index: true,
      //           element: <AlbumDetailPage />,
      //           action: actionFunction,
      //           // errorElement: <ErrorPage />,
      //         },
      //         {
      //           path: "edit",
      //           element: <EditAlbumPage />,
      //           action: albumFormAction,
      //           loader: editAlbumLoader,
      //         },
      //       ],
      //     },
      {
        path: "add-expense",
        element: <NewExpense />,
        // action: albumFormAction,
      },
      //   ],
      // },
      // {
      //   path: "artists",
      //   element: <ArtistsRootLayout />,
      //   children: [
      //     {
      //       index: true,
      //       element: <ArtistsPage />,
      //       loader: artistPageLoader,
      //     },
      //     {
      //       path: ":artistID",
      //       element: <ArtistDetailPage />,
      //       loader: artistDetailLoader,
      //     },
      //   ],
      // },
    ],
  },
]);

function App() {
  return (
    // <AuthProvider>
    <RouterProvider router={router} />
    //  </AuthProvider>
  );
}

export default App;

import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import Room, {
  loader as roomLoader
} from './routes/Room'
import Home from "./routes/Home"
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <div>Oops.</div>
  },
  {
    path: "rooms/:roomId",
    element: <Room />,
    loader: roomLoader
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)

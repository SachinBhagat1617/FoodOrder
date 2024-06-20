import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AdminHome from "./components/AdminHome";
import AddItem from "./components/AddItem";
import Listitem from "./components/Listitem";
import Orders from "./components/Orders";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const url = "https://food-order-red.vercel.app/api/v1";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AdminHome />,
    children: [
      {
        path: "/",
        element: <AddItem url={url} />,
      },
      {
        path: "/listItem",
        element: <Listitem url={url} />,
      },
      {
        path: "/orders",
        element: <Orders url={url} />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ToastContainer/>
      <RouterProvider router={appRouter}/>
    </>
  );
}

export default App;

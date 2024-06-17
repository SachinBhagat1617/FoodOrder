import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Home from "./pages/Home/Home";
import ContactUs from "./Components/ContactUs";
import FoodMenu from "./Components/FoodMenu";
import FoodOutlet from "./Components/FoodOutlet";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/placeOrder",
        element: <PlaceOrder />,
      },
      {
        path: "/contact-us",
        element:<ContactUs/>
      },
      {
        path: "/food-menu",
        element:<FoodOutlet/>
      }
    ],
  },
]);

function App() {
  return (
    <>
      <div>
        <RouterProvider router={appRouter} />
      </div>
    </>
  );
}

export default App;

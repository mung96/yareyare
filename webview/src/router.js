import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import PaymentRedirectPage from "./PaymentRedirectPage";
import PaymentPage from "./PaymentPage";

const Router = () => {
  const routes = [

    {path: '/paymentRedirect', element: <PaymentRedirectPage/>},
    {path: '/payment', element: <PaymentPage/>},

  ]

  const router = createBrowserRouter([...routes]);
  return <RouterProvider router={router}/>;
};

export default Router;

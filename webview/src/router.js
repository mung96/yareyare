import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import PaymentRedirectPage from "./payment/PaymentRedirectPage";
import PaymentPage from "./payment/PaymentPage";
import CertificateRedirectPage from "./certificate/CertificateRedirectPage";
import CertificatePage from "./certificate/CertificatePage";
import WaitingPage from "./waiting/WaitingPage";
import App from "./App";

const Router = () => {
  const routes = [
    {path: '/', element: <App/>},

    {path: '/payment', element: <PaymentPage/>},
    {path: '/paymentRedirect', element: <PaymentRedirectPage/>},

    {path: '/certificate', element: <CertificatePage/>},
    {path: '/certificateRedirect', element: <CertificateRedirectPage/>},

    {path: '/wait', element: <WaitingPage/>},

  ]

  const router = createBrowserRouter([...routes]);
  return <RouterProvider router={router}/>;
};

export default Router;

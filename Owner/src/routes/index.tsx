import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import Home from "../components/dashboard/Home";
import Clients from "../components/clients";
import Classes from "../components/classess/index";
import AppLayout from "../Layout"; // wrap Sidebar here
import { RouterProvider } from "react-router-dom";
import NotFoundPage from "../NotFoundPage";
import TrainerList from "../components/Trainer/TrainerProfile";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type {  RootState } from '../redux/store';

const ProtectedRoute = () => {
  const { loginSuccess } = useSelector((state: RootState) => state.auth);

  return loginSuccess ? <Outlet /> : <Navigate to='/login' replace />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />, // Protect all children routes
    children: [
      {
        element: <AppLayout />, // Contains Sidebar + Outlet
        children: [
          { index: true, element: <Home /> },
          { path: 'clients', element: <Clients /> },
          { path: 'classes', element: <Classes /> },
          { path: 'trainer', element: <TrainerList /> },
          { path: '*', element: <NotFoundPage /> },
        ]
      }
    ]
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/registration',
    element: <Signup />,
  }
]);

const AppRouter = ()=>{
  
    return (
        <RouterProvider router={router} />
    )
}
export default AppRouter; 

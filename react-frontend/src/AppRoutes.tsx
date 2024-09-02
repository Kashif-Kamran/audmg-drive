import { RouteObject, useRoutes, Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/authContext";
import Signup from "@/pages/signup";
import Login from "@/pages/login";
import Home from "@/pages/home";


const ProtectedRoutes = (): JSX.Element => {
    const { authToken } = useAuthContext();

    return (
        <>
            {authToken ? <Outlet /> : <Navigate to="/login" />}
        </>
    )

}

const routes: RouteObject[] = [

    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/",
        element: <ProtectedRoutes />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    }
]

const AppRoutes = () => {
    return useRoutes(routes);
}

export default AppRoutes;

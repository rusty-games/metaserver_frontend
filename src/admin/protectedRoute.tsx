import { ReactNode } from "react";
import { Navigate, Route } from "react-router-dom";
import { adminLoggedIn } from "../Layout/topbar";

interface IProps {
  children: ReactNode;
  path?: string;
}

export const ProtectedRoute = ({ children, ...props }: IProps) => {
  return (
    <Route {...props}>
      {adminLoggedIn() ? children : <Navigate to="/login" />}
    </Route>
  );
};
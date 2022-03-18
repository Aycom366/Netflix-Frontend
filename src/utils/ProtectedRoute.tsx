/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";

interface IProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: IProps) => {
  const navigate = useNavigate();
  const { user } = useAppContext();

  useEffect(() => {
    if (!user?.email) {
      navigate("/login");
    }
  }, [user]);

  if (!window.navigator.onLine) {
    return (
      <div className="center">
        <h3>You are offline</h3>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;

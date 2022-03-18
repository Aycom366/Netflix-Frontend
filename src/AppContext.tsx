/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import instance from "./utils/axiosInstance";

interface ContextProps {
  user: any;
  movies: any;
  setUser: (user: any) => void;
}

const appDefaults: ContextProps = {
  user: {},
  movies: [],
  setUser: (user: ContextProps) => {},
};

interface AppProviderProps {
  children: React.ReactNode;
}

const AppContext = createContext(appDefaults);

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState(appDefaults.user);
  const [loading, setLoading] = useState(true);

  const [movies, setMovies] = useState(appDefaults.movies);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const user = await instance.get("/api/user/show-current-user");
        setUser(user.data.data);
      } catch (error: any) {
        console.log(error.response.data.msg);
      } finally {
        setLoading(false);
      }
    })();
    (async () => {
      try {
        setLoading(true);
        const { data } = await instance.get("/api/movie");
        setMovies(data.data);
      } catch (error: any) {
        console.log(error.response.data.msg);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <AppContext.Provider value={{ user, movies, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

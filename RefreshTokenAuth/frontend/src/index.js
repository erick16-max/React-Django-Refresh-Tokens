import React from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register"
import CreateTodo from "./components/CreateTodo";
import UpdateTodo from "./components/UpdateTodo";
import PrivateRoute from "./middleware/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<h3>Django React Refresh Token Apllication</h3>}/>
              <Route path="home" element={<PrivateRoute><Home/></PrivateRoute>} />
              <Route path="create-todo" element={<PrivateRoute><CreateTodo/></PrivateRoute>}/>
              <Route path="update-todo" element={<PrivateRoute><UpdateTodo/></PrivateRoute>}/>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            
          </Routes>
      </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>
);



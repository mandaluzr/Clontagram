import React, { useState, useEffect } from "react"; //useEffect nos permite ejecutar codigo luego de que el componente fue renderizado.
import Axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./Componentes/Nav";
import Loading from "./Componentes/Loading";
import Main from "./Componentes/Main";
import Error from "./Componentes/Error";
import PostComponent from "./Componentes/Post";

import {
  setToken,
  deleteToken,
  getToken,
  initAxiosInterceptors,
} from "./Helpers/auth-helpers";

import Signup from "./Vistas/Signup";
import Login from "./Vistas/Login";
import Upload from "./Vistas/Upload";
import Feed from "./Vistas/Feed";
import PostVista from "./Vistas/PostVista"; //linea 98
import Explore from "./Vistas/Explore";

initAxiosInterceptors(); // si existe un token, esta función se lo agrega para que pueda reconocer el user.
// se pone por fuera del componente App para que apenas corre el JS.. si hay token, hace la llamada a la App sabiendo que hay un token.

function App() {
  const [usuario, setUsuario] = useState(null); // no sabemos si hay un usuario autenticado
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarUsuario() {
      if (!getToken()) {
        setCargandoUsuario(false);
        return;
      }

      try {
        const { data: usuario } = await Axios.get("/api/usuarios/whoami");
        setUsuario(usuario);
        setCargandoUsuario(false);
      } catch (error) {
        console.log(error);
      }
    }

    cargarUsuario();
  }, []);

  async function login(email, password) {
    const { data } = await Axios.post("api/usuarios/login", {
      email,
      password,
    }); // data.usuario data.token
    setUsuario(data.usuario);
    setToken(data.token);
  }

  async function signup(usuario) {
    const { data } = await Axios.post("api/usuarios/signup", usuario); // data.usuario data.token
    setUsuario(data.usuario);
    setToken(data.token);
  }

  function logout() {
    setUsuario(null);
    deleteToken();
  }

  function mostrarError(mensaje) {
    setError(mensaje);
  }

  function esconderError() {
    setError(null);
  }

  if (cargandoUsuario) {
    return (
      <Main center>
        <Loading />
      </Main>
    );
  }

  return (
    <Router>
      <Nav usuario={usuario} />
      <Error mensaje={error} esconderError={esconderError} />
      {usuario ? (
        <LoginRoutes mostrarError={mostrarError} usuario={usuario} />
      ) : (
        <LogoutRoutes
          login={login}
          signup={signup}
          mostrarError={mostrarError}
        />
      )}
    </Router>
  );
}

function LoginRoutes({ mostrarError, usuario }) {
  return (
    <Switch>
      <Route
        path="/upload"
        render={props => <Upload {...props} mostrarError={mostrarError} />}
      />
      <Route
        path="/post/:id"
        render={props => <PostVista {...props} mostrarError={mostrarError} usuario={usuario} />}
      />
      <Route
        path="/explore"
        render={props => <Explore {...props} mostrarError={mostrarError} />}
      />
      <Route
        path="/"
        render={(props) => (
          <Feed {...props} mostrarError={mostrarError} usuario={usuario} />
        )}
        default
      />
    </Switch>
  );
}

function LogoutRoutes({ login, signup, mostrarError }) {
  return (
    <Switch>
      <Route
        path="/login/"
        render={(props) => (
          <Login {...props} login={login} mostrarError={mostrarError} />
        )}
      />
      <Route
        render={(props) => (
          <Signup {...props} signup={signup} mostrarError={mostrarError} />
        )}
        default
      />
    </Switch>
  );
}

export default App;

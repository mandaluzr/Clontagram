import React, { useState } from "react";
import Main from "../Componentes/Main";
import { Link } from "react-router-dom";
import Axios from 'axios';

const Login = ({ login, mostrarError }) => {
  const [emailYPassword, setEmailYPassword] = useState({
    email: "",
    password: "",
  });

  function handleInputChange(e) {
    setEmailYPassword({
      ...emailYPassword,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault(); // no hacer refresh de la web

    try {
      await login(emailYPassword.email, emailYPassword.password);
    //    const { data } = await Axios.post('/api/usuarios/login', emailYPassword);
    } catch (error) {
      mostrarError(error.response.data);
      console.log(error);
    }
  }

  return (
    <Main center>
      <div className="FormContainer">
        <h1 className="Form__titulo">Clontagram</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="Form__field"
              required
              onChange={handleInputChange}
              value={emailYPassword.email}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="Form__field"
              required
              onChange={handleInputChange}
              value={emailYPassword.password}
            />
            <button className="Form__submit" type="submit">
              Login
            </button>
            <p className="FormContainer__info">
              No tienes cuenta? Creala!{" "}
              <Link to="/signup">
                {" "}
                <br /> <br />
                Sign up!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Main>
  );
};

export default Login;

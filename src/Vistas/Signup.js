import React, { useState } from 'react';
import Main from '../Componentes/Main';
import imagenSignup from '../imagenes/signup.png'
import {Link} from 'react-router-dom';

const Signup = ({ signup, mostrarError }) => {
    const [usuario, setUsuario] = useState({
        email: '',
        nombre: '',
        username: '',
        password: '',
        bio: ''
    });

    function handleInputChange(e) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();  // no hacer refresh de la web

        try {
            await signup(usuario);
            // const { data } = await Axios.post('/api/usuarios/signup', usuario)
        } catch (error) {
            mostrarError(error.response.data);
            console.log(error);
        }

    }

    return (

        <Main center={true}>
            <div className="Signup">
              <img src={imagenSignup} alt="" className="Signup__img"/>
              <div className="FormContainer">
                  <h1 className="Form__titulo">Clontagram</h1>
                  <p className="FormContainer__info">
                      Regístrate para que veas el clon de Instagram
                  </p>
                  <form onSubmit={handleSubmit}>
                      <input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            className="Form__field" 
                            required
                            onChange={handleInputChange}
                            value={usuario.email}
                        />
                        <input 
                            type="text" 
                            name="nombre" 
                            placeholder="Nombre y Apellido" 
                            className="Form__field" 
                            required
                            minLength="3"
                            maxLength="100"
                            onChange={handleInputChange}
                            value={usuario.nombre}
                        />
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Username" 
                            className="Form__field" 
                            required
                            minLength="3"
                            maxLength="30"
                            onChange={handleInputChange}
                            value={usuario.username}
                        />
                        <input 
                            type="text" 
                            name="bio" 
                            placeholder="Cuéntanos de tí..." 
                            className="Form__field" 
                            required
                            maxLength="150"
                            onChange={handleInputChange}
                            value={usuario.bio}
                        />
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Contraseña" 
                            className="Form__field" 
                            required
                            onChange={handleInputChange}
                            value={usuario.password}
                        />
                        <button className="Form__submit" type="submit">Sign Up</button>
                        <p className="FormContainer__info">
                            Ya tienes cuenta? <Link to="/login">Login</Link>
                        </p>
                  </form>
              </div>
            </div>
        </Main>

    );
}

export default Signup;

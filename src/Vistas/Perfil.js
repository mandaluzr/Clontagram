import React, { useState, useEffect } from "react";
import Main from "../Componentes/Main";
import Loading from "../Componentes/Loading";
import Grid from "../Componentes/Grid";
import RecursoNoExiste from "../Componentes/recursoNoExiste";
import Axios from "axios";
import stringToColor from "string-to-color";

export default function Perfil({ mostrarError, usuario, match, logout }) {
  const username = match.params.username;
  const [usuarioDueñoDelPerfil, setUsuarioDueñoDelPerfil] = useState(null);
  const [posts, setPosts] = useState([]);
  const [cargandoPerfil, setCargandoPerfil] = useState(true);
  const [perfilNoExiste, setPerfilNoExiste] = useState(false);
  const [subiendoImagen, setSubiendoImagen] = useState(false);

  useEffect(() => {
    async function cargarPostsYUsuario() {
      try {
        setCargandoPerfil(true);
        const { data: usuario } = await Axios.get(`/api/usuarios/${username}`);
        const { data: posts } = await Axios.get(
          `/api/posts/usuario/${usuario._id}`
        );
        setUsuarioDueñoDelPerfil(usuario);
        setPosts(posts);
        setCargandoPerfil(false);
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 404 || error.response.status === 400)
        ) {
          setPerfilNoExiste(true);
        } else {
          mostrarError("Hubo un problema cargando este perfil.");
        }
        setCargandoPerfil(false);
      }
    }

    cargarPostsYUsuario();
  }, [username]);

  function esElPerfilDeLaPersonaLogin() {
    return usuario._id === usuarioDueñoDelPerfil._id;
  }

  async function handleImagenSeleccionada(event) {
    try {
      setSubiendoImagen(true);
      const file = event.target.files[0];
      const config = {
        headers: {
          "Content-Type": file.type,
        },
      };
      const { data } = await Axios.post("/api/usuarios/upload", file, config);
      setUsuarioDueñoDelPerfil({ ...usuarioDueñoDelPerfil, imagen: data.url });
      setSubiendoImagen(false);
    } catch (error) {
      mostrarError(error.response.data);
      setSubiendoImagen(false);
      console.log(error);
    }
  }

  if (cargandoPerfil) {
    return (
      <Main center>
        <Loading />
      </Main>
    );
  }

  if (perfilNoExiste) {
    return (
      <RecursoNoExiste mensaje="El perfil que estás intentando ver no existe" />
    );
  }

  if (usuario == null) {
    return null;
  }

  return (
    <Main>
      <div className="Perfil">
        <ImagenAvatar
          esElPerfilDeLaPersonaLogin={esElPerfilDeLaPersonaLogin()}
          usuarioDueñoDelPerfil={usuarioDueñoDelPerfil}
          handleImagenSeleccionada={handleImagenSeleccionada}
          subiendoImagen={subiendoImagen}
        />
        <div className="Perfil__bio--container">
          <div className="Perfil__bio-heading">
            <h2 className="capitalize">{usuarioDueñoDelPerfil.username}</h2>
            {!esElPerfilDeLaPersonaLogin() && (
              <BotonSeguir
                siguiendo={usuarioDueñoDelPerfil.siguiendo}
                toggleSiguiendo={() => 1}
              />
            )}
            {esElPerfilDeLaPersonaLogin() && <BotonLogout logout={logout} />}
          </div>
        </div>
      </div>
    </Main>
  );
}

function ImagenAvatar({
  esElPerfilDeLaPersonaLogin,
  usuarioDueñoDelPerfil,
  handleImagenSeleccionada,
  subiendoImagen,
}) {
  let contenido;

  if (subiendoImagen) {
    contenido = <Loading />;
  } else if (esElPerfilDeLaPersonaLogin) {
    contenido = (
      <label
        className="Perfil__img-placeholder Perfil__img-placeholder--pointer"
        style={{
          backgroundImage: usuarioDueñoDelPerfil.imagen
            ? `url(${usuarioDueñoDelPerfil.imagen})`
            : null,
          backgroundColor: stringToColor(usuarioDueñoDelPerfil.username),
        }}
      >
        <input
          type="file"
          onChange={handleImagenSeleccionada}
          className="hidden"
          name="imagen"
        />
      </label>
    );
  } else {
    contenido = (
      <div
        className="Perfil__img-placeholder"
        style={{
          backgroundImage: usuarioDueñoDelPerfil.imagen
            ? `url(${usuarioDueñoDelPerfil.imagen})`
            : null,
          backgroundColor: stringToColor(usuarioDueñoDelPerfil.username),
        }}
      />
    );
  }

  return <div className="Perfil__img-container">{contenido}</div>;
}

function BotonSeguir({ siguiendo, toggleSiguiendo }) {
  return (
    <button onClick={toggleSiguiendo} className="Perfil__boton-seguir">
      {siguiendo ? "Dejar de seguir" : "Seguir"}
    </button>
  );
}

function BotonLogout({ logout }) {
  return (
    <button className="Perfil__boton-logout" onClick={logout}>
      Logout
    </button>
  );
}

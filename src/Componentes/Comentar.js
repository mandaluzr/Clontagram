import React, {useState} from 'react';

const Comentar = ({onSubmitComentario, mostrarError}) => {

    const [mensaje, setMensaje] = useState('');
    const [enviandoComentario, setEnviandoComentario] = useState(false);

    async function onSubmit(e) {
        e.preventDefault();

        if(enviandoComentario) {
            return;
        }
        try {
            setEnviandoComentario(true);
            await onSubmitComentario(mensaje);
            setMensaje('');
            setEnviandoComentario(false);
        } catch (error) {
            setEnviandoComentario(false);
            mostrarError('Hubo un problema al enviar el comentario. Intenta de nuevo.')
        }
    }

    return (
        <form className="Post__comentario-form-container"onSubmit={onSubmit} >
            <input type="text" 
            placeholder="Deja un comentario..."
             required 
             maxLength="180" 
             value={mensaje}
            onChange={e => setMensaje(e.target.value)}/>
            <button type="submit"> Send </button>
        </form>
    )
};

export default Comentar;

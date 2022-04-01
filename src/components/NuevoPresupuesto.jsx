import { useState } from "react";
import Mensaje from "./Mensaje";
//sera un state local para mostrar los mensajes
const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidP}) => {
    //El valor con el que definimos la inicializacion del state presupuesto es de cero


    //Validar que lo introducido en el input sean numeros
    const [mensaje, setMensaje] = useState('');
    const handlePresupuesto = (e) =>{
         e.preventDefault();
         if ( presupuesto <= 0 ){
          setMensaje('Presupuesto no válido');
   //Eliminar el mensaje despues de cierto tiempo
          setTimeout(() => {
            setMensaje('');
          }, 3500);

          //Para evitar que se ejecute lo de abajo
          return;
         }
      
         //El valor es valido y podemos mostrar la otra pantalla
        setIsValidP(true);
         
        
    }
  return (
    <div className="contenedor-presupuesto contenedor sombra">
        <form className="formulario" onSubmit={handlePresupuesto}>
            <div className="campo">
                <label>Definir presupuesto</label>
                <input
                className="nuevo-presupuesto"
                type="number"
                placeholder="Añade tu presupuesto"
                value={presupuesto}
                onChange={e=>{

                    //Modificamos el valor de nuesto state que esta en el App.jsx
                    setPresupuesto(parseInt(e.target.value));
                }}
                 />
            </div>
            <input type="submit" value="Añadir" />
          {
          //se manda el prop children y un prop de tipo, children es todo el mensaje que envuamos
          }
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        </form>
    </div>
  )
}

export default NuevoPresupuesto
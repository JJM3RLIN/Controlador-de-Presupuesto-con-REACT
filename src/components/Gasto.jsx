import {
 LeadingActions,
 SwipeableList,
 SwipeableListItem,
 SwipeAction,
 TrailingActions
} from 'react-swipeable-list';
import "react-swipeable-list/dist/styles.css";
import { formatearFecha } from "../helpers";
import IconoAhorro from '../img/icono_ahorro.svg';
import IconoCasa from '../img/icono_casa.svg';
import IconoComida from '../img/icono_comida.svg';
import IconoGastos from '../img/icono_gastos.svg';
import IconoOcio from '../img/icono_ocio.svg';
import IconoSalud from '../img/icono_salud.svg';
import IconoSus from '../img/icono_suscripciones.svg';

//Diccionario de los iconos
const diccionarioIconos = {

ahorro : IconoAhorro,
comida: IconoComida,
casa: IconoCasa,
gastos: IconoGastos,
ocio: IconoOcio,
salud: IconoSalud,
suscripciones: IconoSus

}
/*Como estamos enviando la categoria al componete
cuando lo mostremos nada mas se accede mediante la categoria y asi
obtenemos la imagen
un diccionario se accede al valor mediante la llave
 */
const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {
    const {nombre, cantidad, categoria, fecha, id} = gasto;
    const leadingActions = ()=>(
      //editar la parte izquierda
      <LeadingActions>
        <SwipeAction onClick={() => setGastoEditar(gasto)} >Editar</SwipeAction>
      </LeadingActions>
    )
    const trailingActions = ()=>(
      <TrailingActions>
        <SwipeAction 
        onClick={() =>eliminarGasto(id)} 
        destructive={true}
        >
          Eliminar</SwipeAction>
      </TrailingActions>
    )
  return (
   <SwipeableList>
     <SwipeableListItem
     leadingActions={leadingActions()}
     trailingActions={trailingActions()}
     >
     <div className="gasto sombra">
       <div className="contenido-gasto">
         {/* Imagen del gasto */}
     <img src={diccionarioIconos[categoria]} alt={`Icono ${categoria}`} />
           <div className="descripcion-gasto">
               <p className="categoria">{categoria}</p>
               <p className="nombre-gasto">{nombre}</p>
               <p className="fecha-gasto">
                 Agregado el: {' '}
                 <span>{formatearFecha(fecha)}</span>
                 </p>
               </div>
           </div>

            
           <p className="cantidad-gasto">${cantidad}</p>

    </div>
     </SwipeableListItem>
   </SwipeableList>
  )
}

export default Gasto
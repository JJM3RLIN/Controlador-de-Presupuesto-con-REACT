import { useState, useEffect } from "react";
import cerrarModal from "./../img/cerrar.svg";
import Mensaje from "./Mensaje";

function Modal({
  setModal, animarModal, 
  setAnimarModal, guardarGasto, 
  gastoEditar, setGastoEditar
}) {

//Para validar el formualrio
  const [mensaje, setMensaje] = useState('');

//Campos del formulario
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [categoria, setCategoria] = useState('');

  //Para verificar si esta creando o editando, si tiene id es pq se esta editando
  const [id, setId] = useState('');
  const [fecha, setFecha] = useState('');

  //Checar que se quiera editar un gasto
  //Se va a ejcutar cuando el componente este listo pq []
useEffect(()=>{
  if(Object.keys(gastoEditar).length > 0){
    //Se esta editando entonces llenamos campos
    setNombre(gastoEditar.nombre);
    setCantidad( gastoEditar.cantidad);
    setCategoria(gastoEditar.categoria);
    setId(gastoEditar.id)
    setFecha(gastoEditar.fecha);
   }
}, []);
    const ocultarModal = ()=>{
//Primero eliminar el animaar modal
        //Para que al volver a abrirlo tenga la animacion
   setAnimarModal(false);

   //Resetear nuestro gasto a editar
   setGastoEditar({});
 
   //depues ocultamos el modal para que no se vea tan de golpe
        //ocultamos el modal
 setTimeout(() => {
  setModal(false);
 }, 500);
    }

    function handleSubmit(e){
      e.preventDefault();

      //Validar datos
      if( [nombre, categoria]. includes('') || cantidad == 0){
        setMensaje('Todos los datos son obligatorios');

        setTimeout(() => {
          setMensaje('');
         }, 2000);

         //Evitamos que se eejecute lo demas de abajo
         return;
        
      }
      guardarGasto({nombre, cantidad, categoria, id, fecha});
    }
  
  return (
    <div className="modal">
         <div className="cerrar-modal">
          <img src={cerrarModal} alt="cerrar modal" 
          onClick={ocultarModal}
          />
         </div>

         <form 
         onSubmit={handleSubmit}
          className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
           <legend>{gastoEditar.nombre ? "Editar gasto" : "Nuevo Gasto"}</legend>

           { mensaje && <Mensaje tipo={'error'} >{mensaje}</Mensaje>}

           <div className="campo">
             <label htmlFor="nombre">Nombre Gasto</label>

             <input type="text"
             id="nombre"
             placeholder="Añade el nombre del gasto"
             value={nombre}
             onChange={e => setNombre(e.target.value)}
              />
           </div>

           <div className="campo">
             <label htmlFor="cantidad">Cantidad</label>

             <input type="number"
             id="cantidad"
             placeholder="Añade la cantidad del gasto; ej. 300"
             value={cantidad}
             onChange={e=> setCantidad(parseInt(e.target.value))}
              />
           </div>

           <div className="campo">
             <label htmlFor="categoria">Categoría</label>

             <select id="categoria" value={categoria ?? ''} onChange={e=>setCategoria(e.target.value)}>
               <option value='' disabled selected> -- Seleccione -- </option>
               <option value="ahorro">Ahorro</option>
               <option value="comida">Comida</option>
               <option value="casa">Casa</option>
               <option value="gastos">Gastos Varios</option>
               <option value="ocio">Ocio</option>
               <option value="salud">Salud</option>
               <option value="suscripciones">Suscripciones</option>
             </select>
           </div>

        <input type="submit" 
        value={gastoEditar.nombre ? "Guardar cambios" : "Añadir Gasto"}
        />
         </form>
    </div>
  )
}

export default Modal
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros';
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';
import { generarId } from './helpers';
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
function App() {
 
const [presupuesto, setPresupuesto ] = useState(
  Number(localStorage.getItem('presupuesto')) ?? 0
);
//En el header se encuentra nuestro formulario y por eso le pasamos
//ese state para modificarlo

//Para mostrar la otra pantalla en donde podemos editar el manejo del gasto
const [isValidP, setIsValidP] = useState(false);

const [modal, setModal] = useState(false);
const [animarModal, setAnimarModal] = useState(false);

const [gastos, setGastos] = useState(
  localStorage.getItem('gastos') ? JSON.parse( localStorage.getItem('gastos')) : []
);

const [gastoEditar, setGastoEditar] = useState({});

//Para los filtros
const [filtro, setFiltro] = useState('');
const [gastosFiltrados, setGastosFiltrados] = useState([]);
useEffect(()=>{
 if(filtro){
   //filtrar gastos por categoria
   const gastosFil =gastos.filter( gasto => gasto.categoria === filtro )
   setGastosFiltrados(gastosFil);
 }
}, [filtro]);

//Cheque por un cambio en gasto editar
useEffect(()=>{

  //Verificar que tenga algo gastoEditar
 if(Object.keys(gastoEditar).length > 0){

  //Llamar al modal para editarlo y para evitar que se este vacio cuando se quiera evitar
  //Si se llamara al handleNuevoGasto el actualizar quedaria en blanco
  setModal(true); 
  setTimeout(() => {
    //Parar agregar la clase que muestra y anima el modal
    setAnimarModal(true);
  }, 500);
 }
}, [gastoEditar]);

useEffect(()=>{
//El presupuesto cambia solo cuando lo definimos
 localStorage.setItem('presupuesto', presupuesto ?? 0);
}, [presupuesto]);

//Para que nos muestre la otra pantalla cuando el presupuesto ya este definido
useEffect(()=>{
 const presupuestoLs = Number(localStorage.getItem('presupuesto')) ?? 0;
 if(presupuestoLs > 0){
   setIsValidP(true);
 }
}, []);

//Guardar gastos en localStorage
useEffect(()=>{
localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);

}, [gastos])
const handleNuevoGasto = ()=>{

  setModal(true);
  //Limpiar par que no se quede los datos del que se edito 
  setGastoEditar({});
  setTimeout(() => {
    //Parar agregar la clase que muestra y anima el modal
    setAnimarModal(true);
  }, 500);
}

const guardarGasto = gasto =>{
  if(gasto.id){
    //Vamos a actualizar
  const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState);
  setGastos(gastosActualizados);
  setGastoEditar({});
  }else{
    //Es un nuevo gasto
    gasto.id = generarId();
    gasto.fecha = Date.now();
   setGastos([...gastos, gasto]);
  }

 setAnimarModal(false);
 setTimeout(() => {
   setModal(false);
 }, 500);
}

const eliminarGasto = id =>{
  //que nos retorne aquellos que sean diferentes al id
  const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
  setGastos(gastosActualizados);
};
  return (
    <div  className={modal ? 'fijar' : '' }>
    <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidP = {isValidP}
        setIsValidP = {setIsValidP}
    />
{
  //Doble & para verificar si es verdadera la condicion que este antes del operador
//isValidP para mostrar la img que nos abre el modal
}
 {isValidP && (
   <>
   <main>
     <Filtros
     filtro={filtro}
     setFiltro={setFiltro}
      />
   <ListadoGastos 
   gastos={gastos}
   setGastoEditar={setGastoEditar}
   eliminarGasto={eliminarGasto}
   gastosFiltrados={gastosFiltrados}
   filtro={filtro}
   />
   </main>

   {
     //icono para añadir un nuevo gasto
   }
     <div className='nuevo-gasto'>
    <img src={IconoNuevoGasto} alt="icono nuevo gasto"
     onClick={handleNuevoGasto}
    />
  </div>
   </>
 ) }
   
   {modal && (
   <Modal 
   setModal={setModal} 
   animarModal={animarModal}
   setAnimarModal={setAnimarModal}
   guardarGasto = {guardarGasto}
   //Cuando se quiera editar un gasto ya se llene el form
   gastoEditar={gastoEditar}
   setGastoEditar={setGastoEditar}
    />
 ) }
    </div>
  )
}

export default App

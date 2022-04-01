import NuevoPresupuesto from "./NuevoPresupuesto";
import ControlPresupuesto from "./ControlPresupuesto"

function Header({presupuesto, 
  setPresupuesto, 
  isValidP, setIsValidP, 
  gastos, setGastos}){
 

    //Ya que tenemos aqui el presupuesto, lo podemos mandar al formulario para manipularlo 
    return (
   <header>
      <h1>Planificador de gastos</h1>
      {
        //Los parentesis es para decir que retorna algo
        //Verificamos si el presupuesto es valido para mostrar el admin
      }
      { isValidP ? 
      <ControlPresupuesto 
      presupuesto={presupuesto} 
      gastos={gastos} 
      setGastos={setGastos}
      setPresupuesto={setPresupuesto}
      setIsValidP={setIsValidP}
      />
 :  
   <NuevoPresupuesto
   presupuesto={presupuesto}
   setPresupuesto={setPresupuesto}
   setIsValidP={setIsValidP}
   /> 
   }
    </header>
    );
}
export default Header;
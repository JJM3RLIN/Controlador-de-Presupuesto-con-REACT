import { useState, useEffect} from 'react';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
//buildStyles sirve para escribir el css de la gráfica y es una función
function ControlPresupuesto({presupuesto, gastos, 
  setGastos, 
  setPresupuesto, setIsValidP}) {

  //Para mostrar lo que nos queda al agregar un gasto
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  const [porcentaje, setPorcentaje] = useState(0);

  //El effect para que escuche por los camnbios que estan sucediend en los gastos
  useEffect( ()=>{
    const totalGastado = gastos.reduce((total, gasto)=>gasto.cantidad + total, 0);

    const totalDisponible = presupuesto - totalGastado;

    //Porcentaje gastado
    const nuevoPorcentaje = (((presupuesto-totalDisponible) / presupuesto)*100).toFixed(2);
  //Para que no se vea tan de golpe el cambio en la gráfica
  setTimeout(()=>{
    setPorcentaje(nuevoPorcentaje);
  }, 500);
    //seteamos gastado
    setGastado(totalGastado);
    setDisponible(totalDisponible);

        
  }, [gastos]);
    const formatearDinero = (cantidad)=>{
        return cantidad.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        });
       }
      const handleResetApp = ()=>{
        const resultado = confirm('¿Deseas reinicar el presupuesto y los gastos?');
        if(resultado){
          setGastos([]);
          setPresupuesto(0);
          //setIsValidP para que nos regrese a la ventana principal
          setIsValidP(false);
        }
      }
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
          {
            //TrailColor, es el color de fondo de la barra antes de llenarse
          }
           <CircularProgressbar
            value={porcentaje}
            styles={buildStyles({
              pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
              trailColor:'#F5F5F5',
              textColor:'#3B82F6'
            })}
            text={`${porcentaje}% Gastado`}
           />
        </div>
        <div className='contenido-presupuesto'>
          <button onClick={handleResetApp} className='reset-app' type='button'>Resetear App</button>
            <p>
              Presupuesto: 
              <span>{formatearDinero(presupuesto)}</span>
              </p>
            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
              Disponible: 
              <span>{formatearDinero(disponible)}</span>
              </p>
            <p>Gastado:
               <span>{formatearDinero(gastado)}</span>
               </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto
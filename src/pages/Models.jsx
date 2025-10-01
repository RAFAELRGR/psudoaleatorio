/* eslint-disable react-hooks/rules-of-hooks */
import Get_DeliveryHash from "../components/Get_DeliveryHash";
import { useState, useEffect } from "react";
import Get_PopulationDensity from "../components/Get_PopulationDensity";
import useBear from "../hooks/useBear";
import { rappi_time } from "../models/rappi_time";
import { simularCajero } from "../simulations/simulatorCajero";
import { redirect } from "react-router-dom";
import DeliveryChart from "../components/DeliveryChart";

const Models = () => {
  const r = useBear((state) => state);
  const exist = r.existR;
  console.log(exist);


  const [result, setResult] = useState([null, null]);


  useEffect(() => {
    if (exist == 0) {
      redirect("/");
      return;
    }

    const res0 = rappi_time(r.randomNumbers);
    const res1 = simularCajero(r.randomNumbers);

    setResult([res0, res1]);
  }, [exist, r.randomNumbers]);

  if (!result[0] || !result[1]) {
    return <p>Loading models…</p>;
  }

  return (
    <>
      <p>Bustos esta es la ruta donde mostrara los modelos</p>
      <h2>Simulacion Costos de Entrega</h2>
      <DeliveryChart data={result[0].map((valor, idx) => ({ index: idx + 1, valor: Number(valor) }))} />
      <Get_DeliveryHash randomNumbers={result[0]} />
      <table className="tabla-vistosa">
        <thead>
          <tr>
            <th>#</th>
            <th>Costo de Entrega</th>
          </tr>
        </thead>
        <tbody>
          {result[0].map((valor, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{Number(valor).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Analisis de resultados</h3>
        <p>
          Promedio de costo de entrega: <strong>
            {(result[0].reduce((acc, val) => acc + Number(val), 0) / result[0].length).toFixed(2)}
          </strong>
        </p>
        <p>
          Costo maximo de entrega: <strong>
            {Math.max(...result[0].map(Number)).toFixed(2)}
          </strong>
        </p>
      </div>
      <br />
      <Get_PopulationDensity randomNumbers={result[1]} />
    </>
  );
};

export default Models;
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import useBear from "../hooks/useBear";
import { rappi_time } from "../models/rappi_time";
import { simularCajero } from "../simulations/simulatorCajero";
import { redirect } from "react-router-dom";
import DeliveryChart from "../components/DeliveryChart";
import TimeByClientDensityChart from "../components/TimeByClientDensityChart";

const Models = () => {
  const r = useBear((state) => state);
  const exist = r.existR;
  const [result, setResult] = useState([null, null]);
  console.log(result);

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
      <div style={{ marginTop: "24px" }}>
        <h3>Análisis de resultados</h3>
        <div className="result-cards-container">
          <div className="result-card">
            <span role="img" aria-label="Promedio">📊</span>
            <div>
              <div className="result-title">Promedio de costo de entrega</div>
              <div className="result-value" style={{ color: "#3a86ff" }}>
                {(result[0].reduce((acc, val) => acc + Number(val), 0) / result[0].length).toFixed(2)}
              </div>
            </div>
          </div>
          <div className="result-card">
            <span role="img" aria-label="Máximo">💰</span>
            <div>
              <div className="result-title">Costo máximo de entrega</div>
              <div className="result-value" style={{ color: "#e07a5f" }}>
                {Math.max(...result[0].map(Number)).toFixed(2)}
              </div>
            </div>
          </div>
          <div className="result-card">
            <span role="img" aria-label="Desviación">📈</span>
            <div>
              <div className="result-title">Desviación estándar</div>
              <div className="result-value" style={{ color: "#43aa8b" }}>
                {(
                  Math.sqrt(
                    result[0].map(Number).reduce((acc, val, _, arr) => acc + Math.pow(val - (arr.reduce((a, v) => a + v, 0) / arr.length), 2), 0) / result[0].length
                  )
                ).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <h2>Simulación de Tiempos de Atención por Cliente (Modelo de Poisson)</h2>
      <TimeByClientDensityChart data={result[1][4].map((valor, idx) => ({
        index: idx + 1,
        valor: Number(valor),
      }))} />

      {result[1] && (
        <div style={{ marginTop: "24px" }}>
          <h3>Análisis de resultados</h3>
          <div className="result-cards-container">
            <div className="result-card">
              <span role="img" aria-label="Clientes">👥</span>
              <div>
                <div className="result-title">Media de clientes por réplica</div>
                <div className="result-value" style={{ color: "#3a86ff" }}>{Math.floor(result[1][0])}</div>
              </div>
            </div>
            <div className="result-card">
              <span role="img" aria-label="Desviación">📈</span>
              <div>
                <div className="result-title">Desviación estándar</div>
                <div className="result-value" style={{ color: "#e07a5f" }}>{result[1][2]}</div>
              </div>
            </div>
            <div className="result-card">
              <span role="img" aria-label="Servicio">⏱️</span>
              <div>
                <div className="result-title">Media del tiempo de servicio</div>
                <div className="result-value" style={{ color: "#43aa8b" }}>{result[1][3]}</div>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Models;
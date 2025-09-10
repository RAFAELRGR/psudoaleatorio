import React, { useState } from "react";
import "./App.css";
import { algoritmoLineal } from "./algorithms/algoritmoLineal";
import { multiplicadorConstante } from "./algorithms/multiplicadorConstante";
import { media } from "./operations/media";

function App() {
  const [algoritmo, setAlgoritmo] = useState("lineal");
  const [resultados, setResultados] = useState([]);
  const [media, setMedia] = useState(null);

  const [Xo, setXo] = useState("");
  const [a, setA] = useState("");
  const [C, setC] = useState("");
  const [m, setM] = useState("");
  const [ri, setRi] = useState("");


  const [D, setD] = useState("");
  const [xo2, setXo2] = useState("");
  const [a2, setA2] = useState("");

  const generar = () => {
    if (algoritmo === "lineal") {
      const nums = algoritmoLineal(Number(Xo), Number(a), Number(C), Number(m), Number(ri));
      setResultados(nums);
      setMedia(media(nums));
    } else {
      const nums = multiplicadorConstante(Number(xo2), Number(D), Number(a2), Number(ri));
      setResultados(nums);
      setMedia(media(nums));
    }
  };

  return (
    <div className="container">
      <h1>Generador de Números Pseudoaleatorios</h1>
      <div className="selector">
        <label>
          <input
            type="radio"
            value="lineal"
            checked={algoritmo === "lineal"}
            onChange={() => setAlgoritmo("lineal")}
          />
          Congruencial Lineal
        </label>
        <label>
          <input
            type="radio"
            value="noLineal"
            checked={algoritmo === "noLineal"}
            onChange={() => setAlgoritmo("noLineal")}
          />
          Multiplicador Constante
        </label>
      </div>
      {algoritmo === "lineal" ? (
        <div className="form">
          <input type="number" value={Xo} onChange={(e) => setXo(e.target.value)} placeholder="Xo (semilla)" />
          <input type="number" value={a} onChange={(e) => setA(e.target.value)} placeholder="a (multiplicador)" />
          <input type="number" value={C} onChange={(e) => setC(e.target.value)} placeholder="C (constante)" />
          <input type="number" value={m} onChange={(e) => setM(e.target.value)} placeholder="m (módulo)" />
          <input type="number" value={ri} onChange={(e) => setRi(e.target.value)} placeholder="Cantidad de números" />
        </div>
      ) : (
        <div className="form">
          <input type="number" value={xo2} onChange={(e) => setXo2(e.target.value)} placeholder="xo (semilla)" />
          <input type="number" value={a2} onChange={(e) => setA2(e.target.value)} placeholder="a (multiplicador)" />
          <input type="number" value={D} onChange={(e) => setD(e.target.value)} placeholder="D (dígitos)" />
          <input type="number" value={ri} onChange={(e) => setRi(e.target.value)} placeholder="Cantidad de números" />
        </div>
      )}

      <button className="btn" onClick={generar}>
        Generar
      </button>
      <div className="resultados">
        <h2>Resultados:</h2>
        {resultados.length > 0 ? (
          <>
            <ol>
              {resultados.map((num, idx) => (
                <li key={idx}>{num}</li>
              ))}
            </ol>
            {(algoritmo === "lineal" || algoritmo === "noLineal") && (
              <p><strong>Media:</strong> {media}</p>
            )}
          </>
        ) : (
          <p>No hay resultados aún</p>
        )}
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import "./App.css";
import { algoritmoLineal } from "./algorithms/algoritmoLineal";
import { multiplicadorConstante } from "./algorithms/multiplicadorConstante";
import { pruebaUniformidad } from "./operations/chi_cuadrado";
import { pruebaIndependencia } from "./operations/independencia";
import { pruebaMedia } from "./operations/media";
import { pruebaVarianza } from "./operations/varianza";

function App() {
  const [algoritmo, setAlgoritmo] = useState("lineal");
  const [resultados, setResultados] = useState([]);
  const [errores, setErrores] = useState("");

  const [Xo, setXo] = useState("");
  const [a, setA] = useState("");
  const [C, setC] = useState("");
  const [m, setM] = useState("");
  const [ri, setRi] = useState("");

  const [D, setD] = useState("");
  const [xo2, setXo2] = useState("");
  const [a2, setA2] = useState("");
  const [mostrarTest, setMostrarTest] = useState(false);
  const [contenidoTest, setContenidoTest] = useState([]);

  const generar = () => {
    let resultado = [];
    if (algoritmo === "lineal") {
      resultado = algoritmoLineal(
        Number(Xo),
        Number(a),
        Number(C),
        Number(m),
        Number(ri)
      );
    } else {
      resultado = multiplicadorConstante(
        Number(xo2),
        Number(D),
        Number(a2),
        Number(ri)
      );
    }
    if (isNaN(resultado[0])) {
      resultado = [];
      setErrores("Has ingresado uno o mas valores invalidos");
    }
    setResultados(resultado);
  };

  const establecerTipoAlgoritmo = (tipo) => {
    setErrores("");
    setAlgoritmo(tipo);
  };

  const testearNumeros = () => {
    setContenidoTest([
      pruebaUniformidad(resultados),
      pruebaIndependencia(resultados),
      pruebaMedia(resultados),
      pruebaVarianza(resultados)
    ])
    setMostrarTest(true);
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
            onChange={() => establecerTipoAlgoritmo("lineal")}
          />
          Congruencial Lineal
        </label>
        <label>
          <input
            type="radio"
            value="noLineal"
            checked={algoritmo === "noLineal"}
            onChange={() => establecerTipoAlgoritmo("noLineal")}
          />
          Multiplicador Constante
        </label>
      </div>
      {algoritmo === "lineal" ? (
        <div className="form">
          <input
            type="number"
            inputMode="numeric"
            value={Xo}
            onChange={(e) => setXo(e.target.value)}
            placeholder="Xo (semilla)"
          />
          <input
            type="number"
            inputMode="numeric"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="a (multiplicador)"
          />
          <input
            type="number"
            inputMode="numeric"
            value={C}
            onChange={(e) => setC(e.target.value)}
            placeholder="C (constante)"
          />
          <input
            type="number"
            inputMode="numeric"
            value={m}
            onChange={(e) => setM(e.target.value)}
            placeholder="m (módulo)"
          />
          <input
            type="number"
            inputMode="numeric"
            value={ri}
            onChange={(e) => setRi(e.target.value)}
            placeholder="Cantidad de números"
          />
        </div>
      ) : (
        <div className="form">
          <input
            type="number"
            inputMode="numeric"
            value={xo2}
            onChange={(e) => setXo2(e.target.value)}
            placeholder="xo (semilla)"
          />
          <input
            type="number"
            inputMode="numeric"
            value={a2}
            onChange={(e) => setA2(e.target.value)}
            placeholder="a (multiplicador)"
          />
          <input
            type="number"
            inputMode="numeric"
            value={D}
            onChange={(e) => setD(e.target.value)}
            placeholder="D (dígitos)"
          />
          <input
            type="number"
            inputMode="numeric"
            value={ri}
            onChange={(e) => setRi(e.target.value)}
            placeholder="Cantidad de números"
          />
        </div>
      )}
      {mostrarTest ? (<>
        <button className="btn" onClick={() => { setMostrarTest(false) }}>
          Finalizar pruebas
        </button>
        <h2>Pruebas</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {contenidoTest.map((test, idx) => (
            <div
              key={idx}
              style={{
                flex: '0 0 calc(50% - 0.5rem)', // two cards per row
                border: '1px solid #ccc',
                padding: '1rem',
                boxSizing: 'border-box'
              }}
            >
              <h3>{['Chi cuadrado', 'Independencia', 'Media', 'Varianza'][idx]}</h3>
              {Object.entries(test).map(([key, value]) => (
                <p key={key}>{key} {value}</p>
              ))}
            </div>
          ))}
        </div>
      </>) : (
        <>
          <br />
          <button className="btn" onClick={generar}>
            Generar
          </button>
        </>
      )}

      <div className="resultados">
        {errores.length > 0 ? (
          <>
            <h2>Error</h2>
            <p>{errores}</p>
          </>
        ) : (
          <>
            <h2>Resultados:</h2>
            {resultados.length > 0 ? (
              <>
                <ol>
                  {resultados.map((num, idx) => (
                    <li key={idx}>{num}</li>
                  ))}
                </ol>
                <button className="btn" onClick={testearNumeros}>
                  Testear
                </button>
              </>
            ) : (
              <p>No hay resultados aún</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;

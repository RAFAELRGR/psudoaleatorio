import { useState, useEffect } from "react";
import "./App.css";
import { algoritmoLineal } from "./algorithms/algoritmoLineal";
import { multiplicadorConstante } from "./algorithms/multiplicadorConstante";
import { useRandomNumber } from "./hooks/useRandomNumber";
import useTestNumbers from "./hooks/useTestNumbers";
import TypeAlgorithGenerateNumber from "./components/TypeAlgorithGenerateNumbers";

function App() {
  const randomNumber = useRandomNumber((state) => state.numbers);
  const setRandomNumber = useRandomNumber((state) => state.setRandomNumber);

  const [algoritmo, setAlgoritmo] = useState("lineal");
  const [resultados, setResultados] = useState(randomNumber);
  const [errores, setErrores] = useState("");

  const [linealInputs, setLinealInputs] = useState({});

  const [multiplicadorInputs, setmultiplicadorInputs] = useState({});

  const setInput = (e) => {
    switch (algoritmo) {
      case "lineal":
        setLinealInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
        break;
      case "noLineal":
        setmultiplicadorInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
        break;
    }
  };

  const [contenidoTest, setContenidoTest] = useState([]);

  useEffect(() => {
    useTestNumbers(resultados, setContenidoTest);
    console.log("test");
  }, [resultados]);

  const generar = () => {
    let resultado = [];
    if (algoritmo === "lineal") {
      const { Xo, a, C, m, ri } = linealInputs;
      resultado = algoritmoLineal(
        Number(Xo),
        Number(a),
        Number(C),
        Number(m),
        Number(ri)
      );
    } else {
      const { xo2, D, a2, ri } = multiplicadorInputs;
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
    setRandomNumber(resultado);
  };

  const establecerTipoAlgoritmo = (tipo) => {
    setErrores("");
    setAlgoritmo(tipo);
    setResultados([]);
  };

  return (
    <div className="container">
      <h1>Generador de Números Pseudoaleatorios</h1>
      <TypeAlgorithGenerateNumber
        algoritmo={algoritmo}
        establecerTipoAlgoritmo={establecerTipoAlgoritmo}
      />
      {algoritmo === "lineal" ? (
        <div className="form">
          <input
            type="number"
            inputMode="numeric"
            value={linealInputs.Xo}
            onChange={(e) => setInput(e)}
            placeholder="Xo (semilla)"
            name="Xo"
          />
          <input
            type="number"
            inputMode="numeric"
            value={linealInputs.a}
            onChange={(e) => setInput(e)}
            placeholder="a (multiplicador)"
            name="a"
          />
          <input
            type="number"
            inputMode="numeric"
            value={linealInputs.C}
            onChange={(e) => setInput(e)}
            placeholder="C (constante)"
            name="C"
          />
          <input
            type="number"
            inputMode="numeric"
            value={linealInputs.m}
            onChange={(e) => setInput(e)}
            placeholder="m (módulo)"
            name="m"
          />
          <input
            type="number"
            inputMode="numeric"
            value={linealInputs.ri}
            onChange={(e) => setInput(e)}
            placeholder="Cantidad de números"
            name="ri"
          />
        </div>
      ) : (
        <div className="form">
          <input
            type="number"
            inputMode="numeric"
            value={multiplicadorInputs.xo2}
            onChange={(e) => setInput(e)}
            placeholder="xo (semilla)"
            name="xo2"
          />
          <input
            type="number"
            inputMode="numeric"
            value={multiplicadorInputs.a2}
            onChange={(e) => setInput(e)}
            placeholder="a (multiplicador)"
            name="a2"
          />
          <input
            type="number"
            inputMode="numeric"
            value={multiplicadorInputs.D}
            onChange={(e) => setInput(e)}
            placeholder="D (dígitos)"
            name="D"
          />
          <input
            type="number"
            inputMode="numeric"
            value={multiplicadorInputs.ri}
            onChange={(e) => setInput(e)}
            placeholder="Cantidad de números"
            name="ri"
          />
        </div>
      )}
      <div className="resultados">
        {errores.length > 0 ? (
          <>
            <h2>Error</h2>
            <p>{errores}</p>
          </>
        ) : (
          <>
            <button className="btn" onClick={generar}>
              Generar
            </button>
            <h2>Resultados:</h2>
            {resultados.length > 0 ? (
              <>
                <ol>
                  {resultados.map((num, idx) => (
                    <li key={idx}>{num}</li>
                  ))}
                </ol>
                <>
                  <h2>Pruebas</h2>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
                  >
                    {contenidoTest.map((test, idx) => (
                      <div
                        key={idx}
                        style={{
                          flex: "0 0 calc(50% - 0.5rem)", // two cards per row
                          border: "1px solid #ccc",
                          padding: "1rem",
                          boxSizing: "border-box",
                        }}
                      >
                        <h3>
                          {
                            [
                              "Chi cuadrado",
                              "Independencia",
                              "Media",
                              "Varianza",
                            ][idx]
                          }
                        </h3>
                        {Object.entries(test).map(([key, value]) => (
                          <p key={key}>
                            {key} {value}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </>
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

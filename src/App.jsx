import { useState, useEffect } from "react";
import "./App.css";
import { algoritmoLineal } from "./algorithms/algoritmoLineal";
import { multiplicadorConstante } from "./algorithms/multiplicadorConstante";
import { useRandomNumber } from "./hooks/useRandomNumber";
import useTestNumbers from "./hooks/useTestNumbers";
import TypeAlgorithGenerateNumber from "./components/TypeAlgorithGenerateNumbers";
import FormAlgorithLineal from "./components/FormAlgorithLineal";
import FormAlgorithMultiplicador from "./components/FormAlgorithMultiplicador";
import TestContent from "./components/TestContent";

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
    useTestNumbers(resultados, setContenidoTest, setErrores);
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
        <FormAlgorithLineal linealInputs={linealInputs} setInput={setInput} />
      ) : (
        <FormAlgorithMultiplicador
          multiplicadorInputs={multiplicadorInputs}
          setInput={setInput}
        />
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
                <TestContent contenidoTest={contenidoTest} />
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

const TypeAlgorithGenerateNumber = ({ algoritmo, establecerTipoAlgoritmo }) => {
  return (
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
  );
};

export default TypeAlgorithGenerateNumber;

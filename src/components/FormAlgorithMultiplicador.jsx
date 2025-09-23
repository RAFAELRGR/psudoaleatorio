const FormAlgorithMultiplicador = ({ multiplicadorInputs, setInput }) => {
  return (
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
  );
};
export default FormAlgorithMultiplicador;

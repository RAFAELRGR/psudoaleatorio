const FormAlgorithLineal = ({ linealInputs, setInput }) => {
  return (
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
  );
};

export default FormAlgorithLineal;

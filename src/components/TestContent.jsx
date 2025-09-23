const TestContent = ({ contenidoTest }) => {
  return (
    <>
      <h2>Pruebas</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
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
              {["Chi cuadrado", "Independencia", "Media", "Varianza"][idx]}
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
  );
};

export default TestContent;

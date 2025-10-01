const Get_PopulationDensity = ({ randomNumbers }) => {
  return (
    <div>
      <p>
        Aqui se refleja lo respectivo al modelo de poison, dando la cantidad de
        tiempo que tarda un cajero por cliente
      </p>
      <p>{JSON.stringify(randomNumbers)}</p>
    </div>
  );
};

export default Get_PopulationDensity;

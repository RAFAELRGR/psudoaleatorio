const Get_DeliveryHash = ({ randomNumbers }) => {
  return (
    <div>
      <p>Aqui se refleja lo respectivo al costo variables de entrega</p>
      <p>{JSON.stringify(randomNumbers)}</p>
    </div>
  );
};

export default Get_DeliveryHash;

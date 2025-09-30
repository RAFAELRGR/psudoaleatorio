import { useLocation } from "react-router-dom";
import Get_DeliveryHash from "../components/Get_DeliveryHash";
import { useState } from "react";

const Models = () => {
  const location = useLocation();
  let r = location?.state?.randomNumbers ?? [];
  const [deliveryHash, setDeliveryHash] = useState();

  return (
    <>
      <p>Bustos esta es la ruta donde mostrara los modelos</p>
      <Get_DeliveryHash
        deliveryHash={deliveryHash}
        setDeliveryHash={setDeliveryHash}
        r={r}
      />
      <p>{JSON.stringify(deliveryHash, null, 2)}</p>
    </>
  );
};

export default Models;

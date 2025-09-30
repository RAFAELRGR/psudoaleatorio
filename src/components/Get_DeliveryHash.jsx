import { useEffect, useMemo } from "react";
import { rappi_time } from "../models/rappi_time";

const Get_DeliveryHash = ({ r, deliveryHash, setDeliveryHash }) => {
  const hash = useMemo(() => (r ? rappi_time(r) : []), [r]);

  useEffect(() => {
    if (!Array.isArray(hash)) return;
    setDeliveryHash(hash);
  }, []);

  return (
    <div>
      <p>Aqui se refleja lo respectivo al costo variables de entrega</p>
    </div>
  );
};

export default Get_DeliveryHash;

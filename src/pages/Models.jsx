/* eslint-disable react-hooks/rules-of-hooks */
import Get_DeliveryHash from "../components/Get_DeliveryHash";
import { useState, useEffect } from "react";
import Get_PopulationDensity from "../components/Get_PopulationDensity";
import useBear from "../hooks/useBear";
import { rappi_time } from "../models/rappi_time";
import { simularCajero } from "../simulations/simulatorCajero";
import { redirect } from "react-router-dom";

const Models = () => {
  const r = useBear((state) => state);
  const exist = r.existR;
  console.log(exist);


  const [result, setResult] = useState([null, null]);


  useEffect(() => {
    if (exist == 0) {
      redirect("/");
      return;
    }

    const res0 = rappi_time(r.randomNumbers);
    const res1 = simularCajero(r.randomNumbers);

    setResult([res0, res1]);
  }, [exist, r.randomNumbers]);

  if (!result[0] || !result[1]) {
    return <p>Loading models…</p>;
  }

  return (
    <>
      <p>Bustos esta es la ruta donde mostrara los modelos</p>
      <Get_DeliveryHash randomNumbers={result[0]} />
      <br />
      <Get_PopulationDensity randomNumbers={result[1]} />
    </>
  );
};

export default Models;
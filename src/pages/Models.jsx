/* eslint-disable react-hooks/rules-of-hooks */
import Get_DeliveryHash from "../components/Get_DeliveryHash";
import { useState, useEffect } from "react";
import Get_PopulationDensity from "../components/Get_PopulationDensity";
import useBear from "../hooks/useBear";
import { rappi_time } from "../models/rappi_time";
import { simularCajero } from "../simulations/simulatorCajero";
const Models = () => {
  const r = useBear((state) => state);

  const result = [rappi_time(r.randomNumbers), simularCajero(r.randomNumbers)]



  return (
    <>
      <p>Bustos esta es la ruta donde mostrara los modelos</p>
      <Get_DeliveryHash
        randomNumbers={result[0]}
      />
      <br />
      <Get_PopulationDensity
        randomNumbers={result[1]}
      />
    </>
  );
};

export default Models;

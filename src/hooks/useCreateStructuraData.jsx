function useCreateStructuraData(tiempoPromedioPorReplica, ClientesR) {
  let dataClean = [];
  for (let index = 0; index < tiempoPromedioPorReplica.length; index++) {
    let aux = {
      replica: index + 1,
      tiempoPromedio: tiempoPromedioPorReplica[index],
      clientesAtendidos: ClientesR[index],
    };
    dataClean.push(aux);
  }
  return dataClean;
}

export default useCreateStructuraData;

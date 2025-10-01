import { poisson } from "../models/modeloPoisson.js";
import { pruebaUniformidad } from "../operations/chi_cuadrado.js";
import { pruebaMedia } from "../operations/media.js";
import { exponencial } from "../models/exponencial.js"

export function simularCajero(uniformes, replicas = 50, lambdaLlegadas = 10, lambdaServicio = 1 / 5) {
  if (!Array.isArray(uniformes) || uniformes.length === 0) return [];
  let resultados = [];
  const tiempoPromedioPorReplica = []
  // const maxUniformes = replicas * 200;
  // const uniformes2 = algoritmoLineal(17, 23, 10007, 12345, maxUniformes);

  let idxPoisson = 0;
  let idxExponencial = 0;
  for (let r = 0; r < replicas; r++) {

    const { clientes, nextIdx } = poisson(lambdaLlegadas, uniformes, idxPoisson);
    idxPoisson = nextIdx;
    // if (r === 0) {
    //   console.log("Prueba de uniformidad:", pruebaUniformidad(uniformes));
    //   console.log("Prueba de media:", pruebaMedia(uniformes));
    // }
    if (clientes == -1) {
      replicas = r
      break;
    }
    let tiemposServicio = [];
    for (let i = 0; i < clientes; i++) {
      if (idxExponencial >= uniformes.length) break;
      const t = exponencial(lambdaServicio, uniformes[idxExponencial]);
      idxExponencial++;
      tiemposServicio.push(t);
    }


    const tiempoTotalServicio = tiemposServicio.reduce((a, b) => a + b, 0);
    const tiempoPromedioServicio = tiemposServicio.length > 0 ? tiempoTotalServicio / tiemposServicio.length : 0;


    resultados.push({
      clientes,
      tiempoTotalServicio,
      tiempoPromedioServicio,
    });
    tiempoPromedioPorReplica.push(tiempoPromedioServicio.toFixed(2))
  }



  const mediaClientes = resultados.reduce((a, r) => a + r.clientes, 0) / replicas;
  const varClientes = resultados.reduce((a, r) => a + Math.pow(r.clientes - mediaClientes, 2), 0) / (replicas - 1);
  const desvClientes = Math.sqrt(varClientes);
  const mediaTiempoServicio = resultados.reduce((a, r) => a + r.tiempoPromedioServicio, 0) / replicas;

  // console.log("=== Resultados Simulación Cajero ===");
  // console.log(`Réplicas: ${replicas}`);
  // console.log(`Media clientes por réplica: ${mediaClientes.toFixed(2)}`);
  // console.log(`Desviación estándar clientes: ${desvClientes.toFixed(2)}`);
  // console.log(`Media tiempo promedio de servicio (minutos): ${mediaTiempoServicio.toFixed(2)}`);
  return [mediaClientes.toFixed(2), varClientes.toFixed(2), desvClientes.toFixed(2), mediaTiempoServicio.toFixed(2), tiempoPromedioPorReplica];
}



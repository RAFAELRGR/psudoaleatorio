export function pruebaChiCuadrado(
  data,
  tipo = "exponencial",
  numIntervalos = 10
) {
  if (!Array.isArray(data) || data.length < 5) {
    return {
      mensaje: "Datos insuficientes para aplicar la prueba Chi-Cuadrado",
    };
  }
  let auxData = data.map((d) => Number.parseFloat(d));
  const n = auxData.length;
  const min = Math.min(...auxData);
  const max = Math.max(...auxData);

  const intervalos = [];
  const frecuenciaObservada = Array(numIntervalos).fill(0);

  const ancho = (max - min) / numIntervalos;
  for (let i = 0; i < numIntervalos; i++) {
    intervalos.push([min + i * ancho, min + (i + 1) * ancho]);
  }

  for (let x of auxData) {
    for (let i = 0; i < numIntervalos; i++) {
      if (x >= intervalos[i][0] && x < intervalos[i][1]) {
        frecuenciaObservada[i]++;
        break;
      }
    }
  }

  const frecuenciaEsperada = [];
  const mean = auxData.reduce((a, b) => a + b, 0) / n;
  const lambda = 1 / mean;

  for (let i = 0; i < numIntervalos; i++) {
    let prob = 0;
    const a = intervalos[i][0];
    const b = intervalos[i][1];
    switch (tipo) {
      case "exponencial":
        prob = Math.exp(-lambda * a) - Math.exp(-lambda * b);
        break;
      case "uniforme":
      default:
        prob = 1 / numIntervalos;
    }

    frecuenciaEsperada.push(prob * n);
  }

  let chi2 = 0;
  for (let i = 0; i < numIntervalos; i++) {
    const fo = frecuenciaObservada[i];
    const fe = frecuenciaEsperada[i];
    if (fe > 0) chi2 += Math.pow(fo - fe, 2) / fe;
  }

  const gradosLibertad = numIntervalos - 1;
  const valorCritico = 16.919;
  //Sacamos este valor de la tabla de chicudrado

  return {
    distribucion: tipo,
    estadistico: chi2.toFixed(4),
    gradosLibertad,
    valorCritico,
    decision:
      chi2 < valorCritico
        ? "No se rechaza H₀: los datos se ajustan a la distribución teórica"
        : "Se rechaza H₀: los datos no se ajustan a la distribución teórica",
  };
}

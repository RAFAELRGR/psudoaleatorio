import jstat from "jstat";

export function pruebaUniformidad(numeros) {
  const n = numeros.length;
  const k = 6;
  const E = n / k;
  let chi2 = 0;

  let conteos = Array(k).fill(0);
  numeros.forEach((v) => {
    const idx = Math.min(Math.floor(v * k), k - 1);
    conteos[idx]++;
  });

  conteos.forEach((O) => {
    chi2 += Math.pow(O - E, 2) / E;
  });

  const chi2Critico = jstat.chisquare.inv(0.99, k - 1);

  return {
    conteos,
    chi2: chi2.toFixed(4),
    chi2Critico: chi2Critico.toFixed(4),
    resultado: chi2 < chi2Critico ? "No se rechaza H0" : "Se rechaza H0",
  };
}

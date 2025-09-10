import jStat from "jstat"; 

export function pruebaVarianza(numeros) {
  const n = numeros.length;
  const media = numeros.reduce((acc, v) => acc + parseFloat(v), 0) / n;
  const varianzaMuestral =
    numeros.reduce((acc, v) => acc + Math.pow(parseFloat(v) - media, 2), 0) /
    (n - 1);

  const sigma2 = 1 / 12;
  const chi2 = ((n - 1) * varianzaMuestral) / sigma2;

  const chi2Lower = jStat.chisquare.inv(0.005, n - 1);
  const chi2Upper = jStat.chisquare.inv(0.995, n - 1);

  return {
    varianza: varianzaMuestral.toFixed(4),
    chi2: chi2.toFixed(4),
    intervalo: [chi2Lower.toFixed(4), chi2Upper.toFixed(4)],
    resultado:
      chi2 > chi2Lower && chi2 < chi2Upper ? "No se rechaza H0" : "Se rechaza H0"
  };
}

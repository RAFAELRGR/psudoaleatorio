
export function pruebaKolmogorovSmirnov(data, tipo = "normal") {
  if (!Array.isArray(data) || data.length < 5) {
    return { mensaje: "Datos insuficientes para aplicar la prueba KS" };
  }

  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;

  const mean = sorted.reduce((a, b) => a + b, 0) / n;
  const std = Math.sqrt(sorted.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (n - 1));


  function cdfNormal(x) {
    return 0.5 * (1 + erf((x - mean) / (std * Math.sqrt(2))));
  }

  function cdfUniform(x) {
    const min = sorted[0];
    const max = sorted[n - 1];
    return (x - min) / (max - min);
  }

function erf(x) {
  
  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);

  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const t = 1 / (1 + p * x);
  const y =
    1 -
    (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t) *
      Math.exp(-x * x);
  return sign * y;
}

  let D = 0;
  for (let i = 0; i < n; i++) {
    const F_emp = (i + 1) / n;
    const F_teor =
      tipo === "uniforme"
        ? cdfUniform(sorted[i])
        : cdfNormal(sorted[i]);
    const diff = Math.abs(F_emp - F_teor);
    if (diff > D) D = diff;
  }

  const ks = D * Math.sqrt(n);
  const pValue = 2 * Math.exp(-2 * Math.pow(ks, 2));
  
  return {
    estadistico: ks.toFixed(4),
    pValue: pValue.toFixed(4),
    D: D.toFixed(4),
    distribucion: tipo,
    interpretacion:
      pValue > 0.05
        ? "No se rechaza H0: los datos se ajustan a la distribución " + tipo
        : "Se rechaza H0: los datos NO se ajustan a la distribución " + tipo,
  };
}

// kolmogorovSmirnov.js (versión corregida y robusta)
export function pruebaKolmogorovSmirnov(inputData, tipo = "exponencial") {
  if (!Array.isArray(inputData)) {
    return { mensaje: "Se requiere un arreglo de datos numéricos" };
  }

  // Convertir a número y filtrar valores inválidos
  const data = inputData.map(v => {
    const num = typeof v === "string" ? parseFloat(v.replace(',', '.')) : Number(v);
    return Number.isFinite(num) ? num : NaN;
  }).filter(v => !Number.isNaN(v));

  if (data.length < 5) {
    return { mensaje: "Datos insuficientes para aplicar la prueba KS", n: data.length };
  }


  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;


  const mean = sorted.reduce((a, b) => a + b, 0) / n;
  const std = Math.sqrt(sorted.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (n - 1));

  function erf(x) {
    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741,
          a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const t = 1 / (1 + p * x);
    const y = 1 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t) * Math.exp(-x * x);
    return sign * y;
  }


  function cdfNormal(x) {
    if (std === 0) return x < mean ? 0 : 1; 
    return 0.5 * (1 + erf((x - mean) / (std * Math.sqrt(2))));
  }

  function cdfUniform(x) {
    const min = sorted[0];
    const max = sorted[n - 1];
    if (max === min) return x < min ? 0 : 1;
    return (x - min) / (max - min);
  }

  function cdfExponencial(x) {
    if (x < 0) return 0;
    const lambda = mean === 0 ? 1 : 1 / mean; 
    return 1 - Math.exp(-lambda * x);
  }

  function cdfLogNormal(x) {
    if (x <= 0) return 0;
    const logData = data.map(v => Math.log(v));
    const m = logData.reduce((a, b) => a + b, 0) / n;
    const s = Math.sqrt(logData.reduce((a, b) => a + Math.pow(b - m, 2), 0) / (n - 1));
    if (s === 0) return x < Math.exp(m) ? 0 : 1;
    return 0.5 * (1 + erf((Math.log(x) - m) / (s * Math.sqrt(2))));
  }


  let D = 0;
  for (let i = 0; i < n; i++) {
    const xi = sorted[i];
    const F_emp = (i + 1) / n; 
    let F_teor = 0;
    switch (tipo) {
      case "uniforme":
        F_teor = cdfUniform(xi);
        break;
      case "log-normal":
        F_teor = cdfLogNormal(xi);
        break;
      case "normal":
        F_teor = cdfNormal(xi);
        break;
      default: 
        F_teor = cdfExponencial(xi);
    }


    if (!Number.isFinite(F_teor)) continue;

    const diff = Math.abs(F_emp - F_teor);
    if (diff > D) D = diff;
  }


  const ks = D * Math.sqrt(n);
  const pValue = Math.min(1, 2 * Math.exp(-2 * Math.pow(ks, 2))); 

  return {
    distribucion: tipo,
    n,
    media: mean,
    desviacion: std,
    estadistico_D: Number(D.toFixed(6)),
    estadistico_KS: Number(ks.toFixed(6)),
    pValue: Number(pValue.toFixed(6)),
    interpretacion:
      pValue > 0.05
        ? `No se rechaza H₀: los datos se ajustan a la distribución ${tipo}`
        : `Se rechaza H₀: los datos no se ajustan a la distribución ${tipo}`,
  };
}

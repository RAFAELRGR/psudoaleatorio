export function pruebaKolmogorovSmirnov(data, tipo = "exponencial") {
  if (!Array.isArray(data) || data.length < 5) {
    return { mensaje: "Datos insuficientes para aplicar la prueba K-S" };
  }


  const datos = data.map(Number).filter(v => !isNaN(v)).sort((a, b) => a - b);
  const n = datos.length;

  const mean = datos.reduce((a, b) => a + b, 0) / n;
  const min = Math.min(...datos);
  const max = Math.max(...datos);
  const desviacion = std(datos);

  let dMax = 0;

  for (let i = 0; i < n; i++) {
    const xi = datos[i];
    const F_emp = (i + 1) / n;
    let F_teor = 0;

    switch (tipo) {
      case "exponencial": {
        const lambda = 1 / mean;
        F_teor = 1 - Math.exp(-lambda * xi);
        break;
      }
      case "normal": {
        F_teor = cdfNormal(xi, mean, desviacion);
        break;
      }
      case "uniforme":
      default:
        F_teor = (xi - min) / (max - min);
    }

    const d = Math.abs(F_emp - F_teor);
    if (d > dMax) dMax = d;
  }

  const dCritico = 1.36 / Math.sqrt(n);
  const decision =
    dMax < dCritico
      ? "No se rechaza H₀: los datos se ajustan a la distribución teórica"
      : "Se rechaza H₀: los datos no se ajustan a la distribución teórica";

  return {
    distribucion: tipo,
    estadistico_D: Number(dMax.toFixed(4)),
    dCritico: Number(dCritico.toFixed(4)),
    n,
    decision,
  };
}


function std(arr) {
  const m = arr.reduce((a, b) => a + b, 0) / arr.length;
  const v = arr.reduce((a, b) => a + Math.pow(b - m, 2), 0) / (arr.length - 1);
  return Math.sqrt(v);
}


function cdfNormal(x, mean = 0, std = 1) {
  const z = (x - mean) / (Math.sqrt(2) * std);
  const t = 1 / (1 + 0.3275911 * Math.abs(z));
  const a1 = 0.254829592,
    a2 = -0.284496736,
    a3 = 1.421413741,
    a4 = -1.453152027,
    a5 = 1.061405429;
  const erf =
    1 -
    (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) *
      t *
      Math.exp(-z * z);
  const sign = z >= 0 ? 1 : -1;
  const erfz = sign * erf;
  return 0.5 * (1 + erfz);
}

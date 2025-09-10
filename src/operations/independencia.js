export function pruebaIndependencia(numeros) {
  const n = numeros.length;
  const media = 0.5; 
  let corridas = 1;

  for (let i = 1; i < n; i++) {
    if (
      (numeros[i] >= media && numeros[i - 1] < media) ||
      (numeros[i] < media && numeros[i - 1] >= media)
    ) {
      corridas++;
    }
  }

  const ER = (2 * n - 1) / 3;
  const VR = (16 * n - 29) / 90;
  const z = (corridas - ER) / Math.sqrt(VR);
  const zCritico = 2.5758;

  return {
    corridas,
    estadisticoZ: z.toFixed(4),
    zCritico,
    resultado: Math.abs(z) < zCritico ? "No se rechaza H0" : "Se rechaza H0"
  };
}

export function pruebaMedia(numeros) {
  const n = numeros.length;
  const media = numeros.reduce((acc, v) => acc + parseFloat(v), 0) / n;
  const z = (media - 0.5) / Math.sqrt(1 / (12 * n));
  const zCritico = 2.5758;

  return {
    media: media.toFixed(4),
    estadisticoZ: z.toFixed(4),
    zCritico,
    resultado: Math.abs(z) < zCritico ? "No se rechaza H0" : "Se rechaza H0"
  };
}


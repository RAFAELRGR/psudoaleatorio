export function pruebaIndependencia(numeros, media = 0.5) {
  const vals = numeros.map(v => parseFloat(v));
  const etiquetas = [];
  for (let v of vals) {
    if (v > media) etiquetas.push("A");
    else if (v < media) etiquetas.push("B");
  }

  const n1 = etiquetas.filter(x => x === "A").length;
  const n2 = etiquetas.filter(x => x === "B").length;
  const n = n1 + n2;

  if (n < 2 || n1 === 0 || n2 === 0) {
    return { error: "No hay suficientes datos o solo una categoría (todo arriba o todo abajo)." };
  }

  let R = 1;
  for (let i = 1; i < etiquetas.length; i++) {
    if (etiquetas[i] !== etiquetas[i - 1]) R++;
  }

  const ER = (2 * n1 * n2) / (n) + 1 / 2;
  const VR = (2 * n1 * n2 * (2 * n1 * n2 - n)) /
    (Math.pow(n, 2) * (n - 1));
  const Z = (R - ER) / Math.sqrt(VR);
  const zCritico = 2.576;

  return {
    n1, n2, n,
    corridas: R,
    ER: ER,
    VR: VR,
    Z: Z.toFixed(4),
    zCritico,
    resultado: Math.abs(Z) < zCritico ? "No se rechaza H0" : "Se rechaza H0"
  };
}

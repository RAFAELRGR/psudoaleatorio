export function algoritmoLineal(Xo, a, C, m, ri) {
  let numeros = [];
  let x = Xo;
  for (let i = 0; i < ri; i++) {
    x = (a * x + C) % m;
    numeros.push(Number(x / (m - 1)).toFixed(4));
  }
  return numeros;
}

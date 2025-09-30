export function exponencial(lambda, random) {
  return -Math.log(1 - random) / lambda;
}
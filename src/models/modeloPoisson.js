export function poisson(lambda, randoms, startIdx = 0) {
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  let idx = startIdx;
  while (p > L && idx < randoms.length) {
    p *= randoms[idx];
    idx++;
    k++;
  }
  return { clientes: k - 1, nextIdx: idx };
}
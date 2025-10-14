export function pruebaShapiroWilk(datos) {
  const n = datos.length;
  if (n < 3 || n > 5000) return { error: 'Tamaño de muestra no válido' }; 

  const sortedData = [...datos].sort((a, b) => a - b);
  const mean = datos.reduce((a, b) => a + b, 0) / n;
  const variance = datos.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (n - 1);
  const stdDev = Math.sqrt(variance);

  let a = []; 
  for (let i = 0; i < Math.floor(n/2); i++) {
    a[i] = Math.sqrt((n+1)/(n*i)) * (sortedData[n-1-i] - sortedData[0]); 
  }

  let numerator = 0;
  let denominator = 0;
  for (let i = 0; i < Math.floor(n/2); i++) {
    numerator += a[i] * (sortedData[n-1-i] - sortedData[i]);
    denominator += Math.pow(sortedData[n-1-i] - sortedData[i], 2);
  }

  const W = Math.pow(numerator, 2) / (denominator * (n-1));  
  const pValue = 1 - W; 

  return {
    WStatistic: W,
    pValue: pValue,
    resultado: pValue > 0.05 ? 'No se rechaza H0 (distribución normal)' : 'Se rechaza H0'
  };
}

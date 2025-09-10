// Función genérica para calcular la media de un array de números
export function media(numeros) {
  if (!numeros || numeros.length === 0) return 0;
  const suma = numeros.reduce((acc, val) => acc + parseFloat(val), 0);
  return (suma / numeros.length).toFixed(4);
}

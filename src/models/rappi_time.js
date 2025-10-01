export function rappi_time(
  r,
  AgrupacionPorOrden = 5,
  BonificacionPedido = 0.1,
  IndiceGanancia = 0.5,
  GananciaBase = 4000,
  CostoBase = 2000,
  TiempoBase = 300
) {
  const rCopy = [...r];

  const CostoTotal = [];
  if (!Array.isArray(rCopy) || rCopy.length === 0) return [];

  for (let index = 0; index < rCopy.length; index++) {
    rCopy[index] = TiempoBase + TiempoBase * rCopy[index];
    let aux =
      ((rCopy[index] - TiempoBase) / AgrupacionPorOrden) *
      (BonificacionPedido * (IndiceGanancia * GananciaBase));
    CostoTotal.push((aux + CostoBase).toFixed(2));
  }
  return CostoTotal;
}
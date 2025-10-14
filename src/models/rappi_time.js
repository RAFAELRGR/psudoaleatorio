import { exponencial } from "./exponencial";

export function rappi_time(
  r,
  AgrupacionPorOrden = 5,
  BonificacionPedido = 0.1,
  IndiceGanancia = 0.5,
  GananciaBase = 4000,
  CostoBase = 5000,
  TiempoBase = 300,
  MediaSegundos = 600
) {
  const rCopy = [...r];
  const lambda = 1 / (MediaSegundos / 60);
  const CostoTotal = [];
  if (!Array.isArray(rCopy) || rCopy.length === 0) return [];

  for (let index = 0; index < rCopy.length; index++) {
    rCopy[index] = 300 + exponencial(lambda, rCopy[index]);
    let aux =
      ((rCopy[index] - TiempoBase) / AgrupacionPorOrden) *
      (BonificacionPedido * (IndiceGanancia * GananciaBase));
    CostoTotal.push((aux + CostoBase).toFixed(2));
  }
  return CostoTotal;
}

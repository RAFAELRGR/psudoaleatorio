export function rappi_time(
  r,
  AgrupacionPorOrden = 5,
  BonificacionPedido = 0.1,
  IndiceGanancia = 0.5,
  GananciaBase = 4000,
  CostoBase = 2000,
  TiempoBase = 300
) {
  const CostoTotal = [];
  if (!Array.isArray(r) || r.length === 0) return [];
  for (let index = 0; index < r.length; index++) {
    r[index] = TiempoBase + TiempoBase * r[index];
    let aux =
      ((r[index] - TiempoBase) / AgrupacionPorOrden) *
      (BonificacionPedido * (IndiceGanancia * GananciaBase));
    CostoTotal.push(aux + CostoBase);
  }
  return CostoTotal;
}

export function rappi_time(r) {
  const IndiceGanancia = 0.5;
  const CostoBase = 2000;
  const GananciaBase = 4000;
  const AgrupacionPorOrden = 5;
  const TiempoBase = 300;
  const BonificacionPedido = 0.1;
  const CostoTotal = [];

  for (let index = 0; index < r.length; index++) {
    r[index] = TiempoBase + TiempoBase * r[index];
    let aux =
      ((r[index] - TiempoBase) / AgrupacionPorOrden) *
      (BonificacionPedido * (IndiceGanancia * GananciaBase));
    CostoTotal.push(aux + CostoBase);
  }
  return CostoTotal;
}

console.log(rappi_time([0.1, 0.4, 0.5]));

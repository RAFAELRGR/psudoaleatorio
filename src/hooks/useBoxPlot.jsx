const useBoxPlot = (boxPlots, size = 250) => {
  let aux = boxPlots.map((d) => Number.parseFloat(d));
  aux = [...aux].sort((a, b) => a - b);
  const n = aux.length;
  const min = aux[0];
  const max = aux[n - 1];

  const sum = aux?.reduce((s, x) => s + x, 0);
  const average = sum / n;
  const lowerQuartile = percentile(boxPlots, 25);
  const median = percentile(boxPlots, 50);
  const upperQuartile = percentile(boxPlots, 75);

  const data = {
    min: min,
    bottomWhisker: lowerQuartile - min,
    bottomBox: median - lowerQuartile,
    topBox: upperQuartile - median,
    topWhisker: max - upperQuartile,
    average: average,
    size: size,
  };

  return [data];
};

const percentile = (arr, q) => {
  const data = arr;
  q = q / 100;
  const p = ((data.length) - 1) * q;
  const b = Math.floor(p);
  const remainder = p - b;
  if (data[b + 1] !== undefined) {
    return parseFloat(data[b]) + remainder * (parseFloat(data[b + 1]) - parseFloat(data[b]));
  } else {
    return parseFloat(data[b]);
  }
}

export default useBoxPlot;

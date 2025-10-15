import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Scatter,
} from "recharts";
import useBoxPlot from "../hooks/useBoxPlot";

const HorizonBar = (props) => {
  const { x, y, width, height } = props;

  if (x == null || y == null || width == null || height == null) {
    return null;
  }

  return (
    <line
      x1={x}
      y1={y}
      x2={x + width}
      y2={y}
      stroke={"#60bbf0ff"}
      strokeWidth={3}
    />
  );
};

const DotBar = (props) => {
  const { x, y, width, height } = props;

  if (x == null || y == null || width == null || height == null) {
    return null;
  }

  return (
    <line
      x1={x + width / 2}
      y1={y + height}
      x2={x + width / 2}
      y2={y}
      stroke={"#60bbf0ff"}
      strokeWidth={5}
      stroke-dasharray={"5"}
    />
  );
};

export default function BoxPlot({ results }) {
  const data = useBoxPlot(results);
  const sorted = results.map(Number).sort((a, b) => a - b);
  const n = sorted.length;
  const min = sorted[0];
  const q1 = sorted[Math.floor(n * 0.25)];
  const median = sorted[Math.floor(n * 0.5)];
  const q3 = sorted[Math.floor(n * 0.75)];
  const max = sorted[n - 1];
  console.log(data);

  const IQR = q3 - q1;
  const lowerWhisker = q1 - 1.5 * IQR;
  const upperWhisker = q3 + 1.5 * IQR;
  const diffLower = median - q1;
  const diffUpper = q3 - median;
  const ratio = diffUpper / (diffLower === 0 ? 1e-6 : diffLower);

  const interpretaciones = [];

  if (ratio > 0.9 && ratio < 1.1) {
    interpretaciones.push({
      caso: "Distribución simétrica (normal o balanceada)",
      descripcion:
        "La distribución de los datos es equilibrada respecto a la mediana. Los valores están distribuidos de forma uniforme, sin sesgos marcados hacia los extremos. Esto sugiere estabilidad y homogeneidad en el comportamiento de los datos.",
    });
  }
  if (ratio >= 1.1) {
    interpretaciones.push({
      caso: "Sesgo a la derecha (cola larga hacia valores altos)",
      descripcion:
        "La mayoría de los valores se concentran en rangos bajos o intermedios, pero existen algunos valores considerablemente altos que extienden la cola del boxplot. Esto refleja la presencia de casos excepcionales.",
    });
  }
  if (ratio <= 0.9) {
    interpretaciones.push({
      caso: "Sesgo a la izquierda (cola larga hacia valores bajos)",
      descripcion:
        "La mayor parte de los datos se agrupa en valores altos, aunque algunos pocos casos presentan valores muy bajos. Esto puede reflejar la existencia de observaciones extraordinariamente rápidas o eficientes.",
    });
  }
  if (IQR > (max - min) * 0.5) {
    interpretaciones.push({
      caso: "Alta variabilidad (caja grande)",
      descripcion:
        "El rango intercuartílico (IQR) es amplio, lo que implica que los valores del conjunto son muy dispares. Esto indica falta de consistencia en el proceso.",
    });
  }
  if (IQR < (max - min) * 0.2) {
    interpretaciones.push({
      caso: "Baja variabilidad (caja pequeña)",
      descripcion:
        "El rango intercuartílico (IQR) es reducido, señal de que los valores están concentrados alrededor de la mediana. Esto representa un proceso controlado y repetible.",
    });
  }
  if (min < lowerWhisker || max > upperWhisker) {
    interpretaciones.push({
      caso: "Presencia de outliers (valores atípicos)",
      descripcion:
        "Existen valores que se alejan del rango intercuartílico normal. Estos puntos extremos pueden ser errores de medición, eventos excepcionales o comportamientos anómalos del sistema.",
    });
  }
  if (interpretaciones.length === 0) {
    interpretaciones.push({
      caso: "Distribución normal sin irregularidades",
      descripcion:
        "No se detectan asimetrías ni valores atípicos relevantes. Los datos se comportan de manera estable y predecible.",
    });
  }

  return (
    <div style={{ textAlign: "center", marginBottom: "16px" }}>
      <h2 style={{ color: "#3a86ff", margin: "16px 0" }}>
        Diagrama de Caja y Bigotes
      </h2>
      <ResponsiveContainer minHeight={600}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <Bar stackId={"a"} dataKey={"min"} fill={"none"} />
          <Bar stackId={"a"} dataKey={"bar"} shape={<HorizonBar />} />
          <Bar stackId={"a"} dataKey={"bottomWhisker"} shape={<DotBar />} />
          <Bar stackId={"a"} dataKey={"bottomBox"} fill={"#8884d8"} />
          <Bar stackId={"a"} dataKey={"bar"} shape={<HorizonBar />} />
          <Bar stackId={"a"} dataKey={"topBox"} fill={"#8884d8"} />
          <Bar stackId={"a"} dataKey={"topWhisker"} shape={<DotBar />} />
          <Bar stackId={"a"} dataKey={"bar"} shape={<HorizonBar />} />
          <ZAxis type="number" dataKey="size" range={[0, 250]} />

          <Scatter dataKey="average" fill={"red"} stroke={"#FFF"} />
          <XAxis />
          <YAxis />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="result-cards-grid">
        <div className="result-card-v2">
          <span className="result-icon" role="img" aria-label="Min">
            🔽
          </span>
          <div className="result-title">Mínimo</div>
          <div className="result-value result-blue">{min.toFixed(2)}</div>
        </div>
        <div className="result-card-v2">
          <span className="result-icon" role="img" aria-label="Q1">
            🟦
          </span>
          <div className="result-title">Q1 (25%)</div>
          <div className="result-value result-blue">{q1.toFixed(2)}</div>
        </div>
        <div className="result-card-v2">
          <span className="result-icon" role="img" aria-label="Mediana">
            📏
          </span>
          <div className="result-title">Mediana</div>
          <div className="result-value result-green">{median.toFixed(2)}</div>
        </div>
        <div className="result-card-v2">
          <span className="result-icon" role="img" aria-label="Q3">
            🟩
          </span>
          <div className="result-title">Q3 (75%)</div>
          <div className="result-value result-blue">{q3.toFixed(2)}</div>
        </div>
        <div className="result-card-v2">
          <span className="result-icon" role="img" aria-label="Max">
            🔼
          </span>
          <div className="result-title">Máximo</div>
          <div className="result-value result-red">{max.toFixed(2)}</div>
        </div>
      </div>

      <div className="result-cards-grid">
        {/* ...tarjetas de valores del boxplot... */}
        <div className="result-card-v2" style={{ minWidth: "320px" }}>
          <span className="result-icon" role="img" aria-label="Conclusión">
            📝
          </span>
          <div className="result-title">Conclusión del análisis</div>
          <div
            className="result-value"
            style={{
              fontSize: "1rem",
              color: "#f2f2f2",
              fontWeight: "normal",
              marginTop: "8px",
            }}
          >
            {interpretaciones[0].caso}
            <br />
            <span
              style={{
                fontSize: "0.95rem",
                color: "#bdbdbd",
                textAlign: "justify",
                display: "block",
              }}
            >
              {interpretaciones[0].descripcion}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from "recharts";

const DeliveryChart = ({ data }) => {
  const [MAX_POINTS, SETMAX_POINTS] = useState(80);
  let maxPointSlice = data.length;
  let minPointSlice = data.length < 50 ? 1 : 50;
  const sampledData =
    data.length > MAX_POINTS
      ? data.filter((_, i) => i % Math.floor(data.length / MAX_POINTS) === 0)
      : data;

  return (
    <>
      {/* Slider to control number of points */}
      <div style={{ margin: "10px 0", textAlign: "center" }}>
        <label>
          Cantidad de valores clave: {MAX_POINTS}
          <input
            type="range"
            min={minPointSlice}
            max={maxPointSlice}
            step={1}
            value={MAX_POINTS}
            onChange={(e) => SETMAX_POINTS(Number(e.target.value))}
            style={{ width: "200px", marginLeft: "10px" }}
          />
        </label>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sampledData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="index"
            interval="preserveStartEnd"
          >
            <Label value="Entrega #" offset={-4} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label
              value="Costo de Entrega ($)"
              angle={-90}
              position="insideLeft"
              offset={-1}
              style={{ textAnchor: "middle" }}
            />
          </YAxis>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="valor" stroke="#8884d8" name="Costo" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default DeliveryChart;
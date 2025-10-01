import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from "recharts";

const TimeByClientDensityChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="index" interval={0}>
        <Label value="Replica" offset={-5} position="insideBottom" />
      </XAxis>
      <YAxis>
        <Label value="Tiempo promedio de Atención (min)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
      </YAxis>
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="valor" stroke="#3a86ff" fill="#a0c4ff" name="Tiempo de Atención" />

    </AreaChart>
  </ResponsiveContainer>
);

export default TimeByClientDensityChart;
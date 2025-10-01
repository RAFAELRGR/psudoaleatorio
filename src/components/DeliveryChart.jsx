
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from "recharts";

const DeliveryChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="index">
        <Label value="Entrega #" offset={-5} position="insideBottom" />
      </XAxis>
      <YAxis>
        <Label value="Costo de Entrega ($)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
      </YAxis>
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="valor" stroke="#8884d8" name="Costo" />
    </LineChart>
  </ResponsiveContainer>
);

export default DeliveryChart;
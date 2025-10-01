
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DeliveryChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="index" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="valor" stroke="#8884d8" />
    </LineChart>
  </ResponsiveContainer>
);

export default DeliveryChart;
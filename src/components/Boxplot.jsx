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
    <line x1={x} y1={y} x2={x + width} y2={y} stroke={"#60bbf0ff"} strokeWidth={3} />
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
  console.log(data);

  return (
    <ResponsiveContainer minHeight={600}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <Bar stackId={"a"} dataKey={"min"} fill={"none"} />
        <Bar stackId={"a"} dataKey={"bar"} shape={<HorizonBar />} />
        <Bar stackId={"a"} dataKey={"bottomWhisker"} shape={<DotBar />} />
        <Bar stackId={"a"} dataKey={"bottomBox"} />
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
  );
}

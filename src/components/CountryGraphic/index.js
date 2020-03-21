import React from "react";
import {
  XAxis,
  YAxis,
  Area,
  Tooltip,
  AreaChart,
  LineChart,
  Legend,
  Line
} from "recharts";

export default function CountryGraphic({ data, lineColor, dataKey, dataKeyX }) {
  const xAndYColor = "#212121";
  return (
    <AreaChart
      width={300}
      height={200}
      data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={"green"} stopOpacity={0.8} />
          <stop offset="95%" stopColor={"red"} stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey={dataKeyX} stroke={xAndYColor} />
      <YAxis stroke={xAndYColor} />
      <Tooltip contentStyle={{ stroke: "#212121" }} />
      <Area
        type="monotone"
        dataKey={dataKey}
        stroke={lineColor}
        fillOpacity={1}
        fill="url(#colorUv)"
      />
    </AreaChart>
  );
}

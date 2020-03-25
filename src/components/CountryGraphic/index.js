import React from "react";
import {
  XAxis,
  YAxis,
  Area,
  Tooltip,
  AreaChart,
  LineChart,
  Legend,
  Line,
  ResponsiveContainer
} from "recharts";

export default function CountryGraphic({ data, lineColor, dataKey, dataKeyX }) {
 
  const xAndYColor = "#212121";
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={lineColor} stopOpacity={0.8} />
            <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip contentStyle={{ stroke: "#212121" }} />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={lineColor}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

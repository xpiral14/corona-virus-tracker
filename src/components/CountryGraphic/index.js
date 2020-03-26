import React from "react";
import {Area, AreaChart, ResponsiveContainer } from "recharts";

export default function CountryGraphic({ data, lineColor, dataKey, dataKeyX, width, height }) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <AreaChart
        data={data}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id={`color${dataKey.replace(/ /g, '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={lineColor} stopOpacity={0.5} />
            <stop offset="100%" stopColor={lineColor} stopOpacity={0.1} />
          </linearGradient>
        </defs>
        {/* <Tooltip contentStyle={{ stroke: "#212121" }} /> */}
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={lineColor}
          fillOpacity={1}
          fill={`url(#color${dataKey.replace(/ /g, '')})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

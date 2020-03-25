import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Legend,
  Line,
  CartesianGrid,
  ReferenceDot,
  ResponsiveContainer
} from "recharts";


let colors = [
  '#D81387',
  '#DFD60F',
  '#12A2D7',
  '#DDBB1E',
  '#141518',
]
export default function CompareCountriesGraph({ countries }) {
  return (
    <ResponsiveContainer width = "100%" height = {450}>
    <LineChart
      data={countries}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Data" />
      <YAxis />
      <ReferenceDot alwaysShow={false} />
      <Tooltip />
      <Legend />
      {Object.keys(countries[0])
        .slice(1)
        .map((countryName, i) => (
          <Line
            type="monotone"
            dataKey={countryName}
            stroke={colors[i]}
            dot={false}
          />
        ))}
    </LineChart>
    </ResponsiveContainer>
  );
}

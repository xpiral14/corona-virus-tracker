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
  CartesianGrid,
  ReferenceDot,
  ResponsiveContainer
} from "recharts";

function generateRandomHexaColor() {
  let possibleCharacteres = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
  ];
  let hexaColor = "";
  for (let i = 0; i < 6; i++) {
    hexaColor += possibleCharacteres[Math.floor(Math.random() * 6) + 1];
  }
  return "#" + hexaColor;
}

// let countries = [
//   {"id": 1, "Total de casos": 122, "Data": "17 de março"},
//   {"id": 2,"Total de casos": 123, "Data": "17 de março"},
//   {"id": 3,"Total de casos": 124, "Data": "18 de março"},
//   {"id": 4,"Total de casos": 125, "Data": "19 de março"},
//   {"id": 5,"Total de casos": 126, "Data": "19 de março"},
//   {"id": 6,"Total de casos": 127, "Data": "19 de março"},
// ]

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

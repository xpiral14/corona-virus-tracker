import React from "react";
import { PieChart as PieChartRechart, Pie, Cell, Legend } from "recharts";
const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
export default function PieChart({data, dataKey }) {
  return (
    <PieChartRechart width={800} height={400}>
      
      <Pie
      activeIndex = "Casos ativos"
        data={data}
        cx={120}
        cy={200}
        dataKey= "Casos ativos"
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
      />
    </PieChartRechart>
  );
}

"use client";
import {
  ResponsiveContainer,
  PieChart,
  Tooltip,
  Legend,
  Pie,
  Cell,
} from "recharts";

const StudentsPieChart = ({ pieData }) => {
  console.log("PIEDATA is Array?:", Array.isArray(pieData));
  const COLORS = [
    "#008000",
    "#FFA500",
    "FF0000",
    "#0000FF",
    "#FF00FF",
    "#800080",
    "#FFC0CB",
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#d0ed57",
  ];
  return (
    <div className="m-auto bg-white p-4 rounded-lg w-full">
      <h1 className="text-2xl font-bold text-center mb-4">
        Students in each course
      </h1>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={75}
            fill="#8884d8"
            dataKey={"students"}
            nameKey={"course"}
            className="mb-4"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="horizontal" align="center" verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentsPieChart;

"use client";
import {
  Pie,
  PieChart,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AttendancePieChart = ({ attendanceStats }) => {
  console.log("ATTENDANCESTATS:", attendanceStats);

  // Colors for the piechart
  const COLORS = [
    "#FF00FF", // Fuchsia
    "#FF00AA", // Magenta
    "#EA580C", // Heavy orange
    "#0000FF", // Blue
    "#FF0000", // Red
    "#008000", // Green
    "#FFA500", // Orange
    "#FFC0CB", // Pink
    "#800080", // Purple
    "#EE82EE", // Violet
    "#4B0082", // Indigo
  ];

  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] flex flex-col justify-center items-center overflow-x-hidden">
      <h1 className="text-2xl text-center gradient-text">
        My attendance score board
      </h1>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={attendanceStats}
            dataKey="attendancePercentage"
            nameKey="courseCode"
            cx="50%"
            cy="50%"
            outerRadius="90%"
            innerRadius="70%"
            fill="#8884d8"
          >
            {attendanceStats.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          {/* <Legend /> */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendancePieChart;

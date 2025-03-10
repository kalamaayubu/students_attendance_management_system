"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  Tooltip,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const AttendanceLineChart = ({ data }) => {
  console.log("Chart data:", data);
  // Extract unique course codes dynamically
  const courseCodes = [
    ...new Set(
      data.flatMap((d) => Object.keys(d).filter((k) => k !== "session"))
    ),
  ];

  // Define a set of distinct colors
  const COLORS = [
    "#008000",
    "#FFA500",
    "FF0000",
    "#0000FF",
    "#FF00FF",
    "#800080",
    "#FFC0CB",
  ];
  console.log("COURSE CODES:", courseCodes);
  return (
    <div className="bg-white rounded-lg p-4">
      <h3 className="text-2xl font-bold mb-4 text-center">
        Attendance statistics
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray={"3 3"} strokeOpacity={0.4} />
          <XAxis
            dataKey="session"
            label={{ value: "Session", position: "insideBottom", offset: -2 }}
          />
          <YAxis
            label={{
              value: "Attendance",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          {courseCodes.map((courseCode, index) => (
            <Line
              key={courseCode}
              type="monotone"
              dataKey={courseCode}
              stroke={COLORS[index % COLORS.length]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceLineChart;

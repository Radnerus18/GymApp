import { PieChart, Pie, Cell } from "recharts";

const ActiveMembersCard = () => {
  const activeMembers = 85;
  const totalMembers = 120; // Example total, replace with dynamic value
  const activePercentage = (activeMembers / totalMembers) * 100;

  const data = [
    { name: "Active", value: activeMembers },
    { name: "Inactive", value: totalMembers - activeMembers },
  ];

  const COLORS = ["#2563EB", "#E5E7EB"]; // blue, light gray

  return (
    <div className="bg-yellow-100 rounded-xl shadow-md p-4 flex items-center justify-between w-[100%] h-47">
      <div className="h-full  flex flex-col items-start gap-5">
        <p className="text-2xl text-gray-700 font-medium">Active Members</p>
        <h2 className="text-3xl font-bold text-green-600">{activeMembers}</h2>
      </div>
      <PieChart width={150} height={150}>
        <Pie
          data={data}
          innerRadius={50}
          outerRadius={67}
          startAngle={90}
          endAngle={-270}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((_, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <text
          x={75}
          y={75}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-2xl font-bold text-gray-700"
        >
          {`${Math.round(activePercentage)}%`}
        </text>
      </PieChart>
    </div>
  );
};

export default ActiveMembersCard;

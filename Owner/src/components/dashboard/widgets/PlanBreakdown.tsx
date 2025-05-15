import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Basic", value: 25 },
  { name: "Standard", value: 40 },
  { name: "Premium", value: 15 },
];

const COLORS = ["#6366F1", "#10B981", "#F59E0B"];

const PlanBreakdown = () => {
  return (
    <div className="w-[100%] h-80 p-4 bg-white shadow rounded-2xl">
      <h2 className="text-2xl font-semibold text-gray-700">Membership Plans</h2>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={50}
            paddingAngle={3}
            label
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlanBreakdown;

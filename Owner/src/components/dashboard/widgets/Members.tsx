import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { month: 'Jan', members: 20 },
  { month: 'Feb', members: 50 },
  { month: 'Mar', members: 85 },
  { month: 'Apr', members: 30 },
  { month: 'May', members: 95 },
  { month: 'Jun', members: 120 },
];

const Members = () => {
  return (
    <div className="bg-white shadow-md rounded-[10px] p-6 w-full h-60 flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-semibold text-gray-700">Total Members</h3>
        <p className="text-3xl font-bold text-blue-600 mb-2">120</p>
      </div>
      <ResponsiveContainer width="100%" height={130} className='bg-stone-100 p-1'>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis hide />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="members"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Members;

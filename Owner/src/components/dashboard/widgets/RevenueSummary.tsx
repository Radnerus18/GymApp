import { FC } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { IndianRupeeIcon } from "lucide-react";
import { RevenueSummaryProps } from "../../../types/types";

const RevenueSummary: FC<RevenueSummaryProps> = ({ totalRevenue, month = "May", data }) => {
  return (
    <div className="w-full h-80 bg-white shadow-lg rounded-2xl p-4 flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Revenue Summary</h2>
          <p className="text-sm text-gray-500">{month} Earnings</p>
        </div>
        <div className="bg-green-100 text-green-600 p-2 rounded-full">
          <IndianRupeeIcon className="w-4 h-4" />
        </div>
      </div>

      {/* Revenue Figure */}
      <div className="text-2xl font-bold text-gray-800 mb-2">
        ₹ {totalRevenue.toLocaleString("en-IN")}
      </div>

      {/* Chart */}
      <div className="w-full h-[60%]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#34d399" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueSummary;

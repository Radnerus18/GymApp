import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity } from "lucide-react";
import { CheckinsThisWeekCardProps } from "../../../types/types";


const CheckinsThisWeekCard: React.FC<CheckinsThisWeekCardProps> = ({ checkinData, total }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-[100%] h-100 flex flex-col justify-between" >
      {/* Header */}
      <div className="flex items-center gap-2">
        <Activity className="text-blue-600 w-4 h-4" />
        <p className="text-2xl font-semibold text-gray-700">Check-ins This week</p>
      </div>

      {/* Chart */}
      <div className="h-50 bg-stone-100 p-2 rounded-[10px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={checkinData}>
            <CartesianGrid strokeDasharray="3 5" vertical={false} stroke="#000"/>
            <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} style={{color:'#000'}}/>
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-l mt-1 h-20 rounded-[10px] px-2"  style={{backgroundColor:'#cecfff'}}>
        <div className="flex items-center gap-1">
          <Activity className="w-3 h-3 text-blue-600" />
          <span>Check-ins This Week</span>
        </div>
        <span className="text-base font-bold text-gray-800">{total}</span>
      </div>
    </div>
  );
};

export default CheckinsThisWeekCard;

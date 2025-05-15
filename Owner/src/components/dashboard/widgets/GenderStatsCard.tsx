import { BarChart2 } from "lucide-react";

interface GenderStatsCardProps {
  maleCount: number;
  femaleCount: number;
}

const GenderStatsCard: React.FC<GenderStatsCardProps> = ({
  maleCount,
  femaleCount,
}) => {
  const total = maleCount + femaleCount;

  const malePercent = (maleCount / total) * 100;
  const femalePercent = (femaleCount / total) * 100;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-[100%] h-47">
      <div className="flex items-center gap-2 mb-4">
        <BarChart2 className="text-blue-600 w-5 h-5" />
        <p className="text-2xl font-semibold text-gray-700">Members by Gender</p>
      </div>

      {/* Male */}
      <div className="flex justify-between text-sm font-medium mb-1">
        <span>Male</span>
        <span>{maleCount}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${malePercent}%` }}
        />
      </div>

      {/* Female */}
      <div className="flex justify-between text-sm font-medium mb-1">
        <span>Female</span>
        <span>{femaleCount}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gray-800 h-2 rounded-full"
          style={{ width: `${femalePercent}%` }}
        />
      </div>
    </div>
  );
};

export default GenderStatsCard;

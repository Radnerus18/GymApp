import { useEffect, useState } from "react";
import axios from "axios";
import { AttendenceProps } from "../../../types/types";
const AttendanceWidget = () => {
  const [attendance, setAttendance] = useState<AttendenceProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_APP_AXIOS_URL_1 + "/attendance/today"
        );
        setAttendance(response.data.data || []);
      } catch (error) {
        console.error("Failed to load attendance:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  return (
    <div className="bg-blue-50 shadow-md rounded-2xl p-6 w-full max-w-2xl h-60">
      <h3 className="text-2xl text-blue-800 mb-4">
        📋 Today's Attendance
      </h3>

      {loading ? (
        <p className="text-blue-600">Loading...</p>
      ) : attendance.length === 0 ? (
        <p className="text-blue-600">No clients checked in yet.</p>
      ) : (
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {attendance.map((entry, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-white p-3 rounded-lg shadow border-l-4 border-blue-400"
            >
              <span className="font-medium text-gray-800">{entry.name}</span>
              <span className="text-sm text-blue-700">{entry.time}</span>
              <span className="text-sm text-indigo-500 italic">
                {entry.plan}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 text-xl text-gray-800 flex items-center gap-5">
        ✅ Total Check-ins:{" "}
        <span className="font-bold text-3xl">{attendance.length}</span>
      </div>
    </div>
  );
};

export default AttendanceWidget;

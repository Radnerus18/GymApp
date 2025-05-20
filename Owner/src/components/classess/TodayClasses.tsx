import { useEffect, useState,memo } from 'react';
import AddClassModal from './AddClassModal';
import EditClassModal from './EditClassModal';
import { ClassesDataProps } from '../../types/types';

type todayClassItem = {
  _id:string;
  title: string;
  time: string;
  trainer: string;
  type:string;
};

const TodaysClasses = ({ clsdata,deleteClass }: ClassesDataProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [todaysClasses, setTodaysClasses] = useState<todayClassItem[]>([
    { _id:'',title: '', time: '', trainer: '',type:'' },
  ]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editClassData, setEditClassData] = useState<todayClassItem | null>(null);
 const workoutTypes = ['Yoga', 'Zumba', 'CrossFit', 'HIIT'];
  const trainers = ['John Doe', 'Jane Smith', 'Alex Turner'];
  const handleAddClass = () => {
    // Placeholder: replace with modal or actual form
    setModalOpen(true)
  };
  useEffect(() => {
    if (Array.isArray(clsdata)) {
      setTodaysClasses(clsdata as todayClassItem[]);
    } else if (clsdata && typeof clsdata === 'object') {
      setTodaysClasses([clsdata as todayClassItem]);
    } else {
      setTodaysClasses([]);
    }
  }, [clsdata]);

  return (
    <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl shadow-sm w-full max-w-2xl relative">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-blue-700">📅 Today's Classes</h3>
        <button
          onClick={handleAddClass}
          className="flex items-center gap-1 text-xs bg-blue-500 text-white px-3 py-1 rounded-md shadow-sm hover:bg-blue-600 transition"
        >
          <span className="text-sm">+</span> Add
        </button>
      </div>
      {todaysClasses.length > 0 ? (
        <ul className="space-y-2 max-h-[80dvh] overflow-y-auto">
          {todaysClasses.map((item) => (
            <li
              key={item._id}
              className="bg-white p-3 rounded shadow-sm border border-blue-100 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{item.title} <span className="text-sm text-gray-500">• {item.type}</span></p>
                <p className="text-sm text-gray-500">
                  {item.time} • {item.trainer}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditClassData(item);
                    setEditModalOpen(true);
                  }}
                  className="text-blue-500 hover:text-blue-700 transition"
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  onClick={() => {
                    deleteClass(todaysClasses.filter((e) => e._id == item._id));
                  }}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No classes today.</p>
      )}
      <AddClassModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        trainers={trainers}
        types={workoutTypes}
        classType={"today"}
      />
      {editClassData && (
        <EditClassModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          trainers={trainers}
          types={workoutTypes}
          classType={"today"}
          classData={{
            id: editClassData._id,
            title: editClassData.title,
            time: editClassData.time,
            trainer: editClassData.trainer,
            day: '', // today class may not have day
            type: editClassData.type, // update if you have this info
          }}
          onSuccess={() => {
            setEditModalOpen(false);
            // Optionally refresh class list here
          }}
        />
      )}
    </div>
  );
};
export default memo(TodaysClasses)


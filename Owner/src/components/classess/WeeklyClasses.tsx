import  { useState,useEffect } from 'react';
import AddClassModal from './AddClassModal';
import { ClassesDataProps } from '../../types/types';
type WeeklyClassItem = {
  _id:string;
  title: string;
  day: string;
  time: string;
  trainer: string;
  type:string;
};

const WeeklyClasses = ({ clsdata,deleteClass }: ClassesDataProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  
  const workoutTypes = ['Yoga', 'Zumba', 'CrossFit', 'HIIT'];
  const trainers = ['John Doe', 'Jane Smith', 'Alex Turner'];
  const [weekClasses, setWeekClasses] = useState<WeeklyClassItem[]>([
    { _id:'',title: '',day:'', time: '', trainer: '',type:'' },
  ]);
  useEffect(()=>{
    if (Array.isArray(clsdata)) {
      setWeekClasses(clsdata as WeeklyClassItem[]);
    } else if (clsdata && typeof clsdata === 'object') {
      setWeekClasses([clsdata as WeeklyClassItem]);
    } else {
      setWeekClasses([]);
    }
    // console.log('@@@cls',clsdata)
  },[clsdata])
  const handleAddWeeklyClass = () => {
    setModalOpen(true)
  };

  return (
    <div className="bg-green-50 border border-green-200 p-4 rounded-2xl shadow-sm w-full max-w-2xl">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-green-700">📆 Weekly Classes</h3>
        <button
          onClick={handleAddWeeklyClass}
          className="flex items-center gap-1 text-xs bg-green-500 text-white px-3 py-1 rounded-md shadow-sm hover:bg-green-600 transition"
        >
          <span className="text-sm">+</span> Add
        </button>
      </div>
      {weekClasses.length > 0 ? (
        <ul className="space-y-2 max-h-[80dvh] overflow-y-auto">
          {weekClasses.map((item, index) => (
            <li
              key={index}
              className="bg-white p-3 rounded shadow-sm border border-green-100 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{item.title} <span className="text-sm text-gray-500">• {item.type}</span></p>
                <p className="text-sm text-gray-500">
                  {item.day} • {item.time} • {item.trainer}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    // Placeholder logic for editing a class
                    const updatedClasses = [...weekClasses];
                    updatedClasses[index] = {
                      ...item,
                      title: `${item.title} (Edited)`
                    };
                    setWeekClasses(updatedClasses);
                  }}
                  className="text-blue-500 hover:text-blue-600 transition"
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  onClick={() => {
                    // Logic for deleting a class
                    deleteClass(weekClasses.filter((e) => e._id == item._id));
                  }}
                  className="text-red-500 hover:text-red-600 transition"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No weekly classes added yet.</p>
      )}
      <AddClassModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        trainers={trainers}
        types={workoutTypes}
        classType={"weekly"}
      />
    </div>
  );
};

export default WeeklyClasses;

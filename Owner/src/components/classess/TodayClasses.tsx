import { useState } from 'react';
import AddClassModal from './AddClassModal';

type ClassItem = {
  title: string;
  time: string;
  instructor: string;
};

const TodaysClasses = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [todaysClasses, setTodaysClasses] = useState<ClassItem[]>([
    { title: 'Yoga Basics', time: '8:00 AM', instructor: 'Alice' },
    { title: 'HIIT Session', time: '10:00 AM', instructor: 'Bob' }
  ]);
 const workoutTypes = ['Yoga', 'Zumba', 'CrossFit', 'HIIT'];
  const trainers = ['John Doe', 'Jane Smith', 'Alex Turner'];
  const handleAddClass = () => {
    // Placeholder: replace with modal or actual form
    const newClass = {
      title: 'New Class',
      time: '12:00 PM',
      instructor: 'Charlie'
    };
    setTodaysClasses([...todaysClasses, newClass]);
    setModalOpen(true)
  };

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
          {todaysClasses.map((item, index) => (
            <li
              key={index}
              className="bg-white p-3 rounded shadow-sm border border-blue-100 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">
                  {item.time} • {item.instructor}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    // Handle edit logic here
                  }}
                  className="text-blue-500 hover:text-blue-700 transition"
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  onClick={() => {
                    setTodaysClasses(todaysClasses.filter((_, i) => i !== index));
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
      />
    </div>
  );
};

export default TodaysClasses;

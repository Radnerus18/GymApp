import  { useState } from 'react';

type WeeklyClass = {
  title: string;
  day: string;
  time: string;
  instructor: string;
};

const WeeklyClasses = () => {
  const [weekClasses, setWeekClasses] = useState<WeeklyClass[]>([
    { title: 'Strength Training', day: 'Monday', time: '9:00 AM', instructor: 'John' },
    { title: 'Zumba Dance', day: 'Wednesday', time: '6:00 PM', instructor: 'Lily' },
    { title: 'Pilates', day: 'Friday', time: '7:00 AM', instructor: 'Emma' }
  ]);

  const handleAddWeeklyClass = () => {
    // Placeholder logic for adding a new class
    const newClass: WeeklyClass = {
      title: 'New Weekly Class',
      day: 'Saturday',
      time: '5:00 PM',
      instructor: 'Sophia'
    };
    setWeekClasses([...weekClasses, newClass]);
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
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">
                  {item.day} • {item.time} • {item.instructor}
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
                    setWeekClasses(weekClasses.filter((_, i) => i !== index));
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
    </div>
  );
};

export default WeeklyClasses;

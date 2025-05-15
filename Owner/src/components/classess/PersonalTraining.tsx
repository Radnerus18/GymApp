import { useState } from "react";

type PersonalTraining = {
  title: string;
  day: string;
  time: string;
  instructor: string;
};

const PersonalTraining = () => {
  const [personalTrainings, setPersonalTrainings] = useState<
    PersonalTraining[]
  >([
    {
      title: "One-on-One Cardio",
      day: "Tuesday",
      time: "8:00 AM",
      instructor: "Alex",
    },
    {
      title: "Strength Focus",
      day: "Thursday",
      time: "10:00 AM",
      instructor: "Maya",
    },
  ]);

  const handleAddSession = () => {
    const newSession: PersonalTraining = {
      title: "New Session",
      day: "Saturday",
      time: "2:00 PM",
      instructor: "Trainer A",
    };
    setPersonalTrainings([...personalTrainings, newSession]);
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-2xl shadow-sm w-full max-w-2xl">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-yellow-700">
          💪 Personal Training
        </h3>
        <button
          onClick={handleAddSession}
          className="flex items-center gap-1 text-xs bg-yellow-500 text-white px-3 py-1 rounded-md shadow-sm hover:bg-yellow-600 transition"
        >
          <span className="text-sm">+</span> Add
        </button>
      </div>
      {personalTrainings.length > 0 ? (
        <ul className="space-y-2 max-h-[80dvh] overflow-y-auto">
          {personalTrainings.map((item, index) => (
            <li
              key={index}
              className="bg-white p-3 rounded shadow-sm border border-yellow-100 flex justify-between items-center"
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
                    const updatedTrainings = personalTrainings.filter(
                      (_, i) => i !== index
                    );
                    setPersonalTrainings(updatedTrainings);
                  }}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Delete"
                >
                  🗑️
                </button>
                <button
                  onClick={() => {
                    const updatedTrainings = [...personalTrainings];
                    updatedTrainings[index] = {
                      ...item,
                      title: `${item.title} (Edited)`,
                    };
                    setPersonalTrainings(updatedTrainings);
                  }}
                  className="text-blue-500 hover:text-blue-700 transition"
                  title="Edit"
                >
                  ✏️
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">
          No personal training sessions yet.
        </p>
      )}
    </div>
  );
};

export default PersonalTraining;

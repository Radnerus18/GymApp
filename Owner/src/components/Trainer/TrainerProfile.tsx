
interface Trainer {
  id: string;
  name: string;
  specialty: string;
  image: string;
}

const trainers: Trainer[] = [
  {
    id: "1",
    name: "John Doe",
    specialty: "Strength & Conditioning",
    image: "https://via.placeholder.com/80", // Replace with actual image URL
  },
  {
    id: "2",
    name: "Jane Smith",
    specialty: "Yoga & Flexibility",
    image: "https://via.placeholder.com/80",
  },
];

const TrainerList = () => {
  const handleAddTrainer = () => {
    // Add your modal or form logic here
    alert("Add Trainer clicked");
  };

  return (
    <div className="bg-white shadow rounded-l-2xl p-6 w-[1-00%] h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">🏋️ Trainers</h3>
        <button
          onClick={handleAddTrainer}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-lg"
        >
          + Add Trainer
        </button>
      </div>

      {trainers.length === 0 ? (
        <p className="text-gray-600">No trainers available.</p>
      ) : (
        <div className="space-y-4">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="flex items-center bg-blue-50 p-4 rounded-lg shadow-sm"
            >
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-16 h-16 rounded-full object-cover mr-4 border border-blue-400"
              />
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{trainer.name}</h4>
                <p className="text-sm text-gray-600">{trainer.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainerList;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddTrainerModal from './AddTrainerModal';
import { fetchTrainers } from '../../redux/trainerSlice';
import { RootState, AppDispatch } from '../../redux/store';

const TrainerList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { trainers, loading, error } = useSelector((state: RootState) => state.trainers);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  const handleAddTrainer = () => {
    setModalOpen(true);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 shadow rounded-l-2xl p-8 w-full h-full min-h-[80vh]">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-extrabold text-blue-800 flex items-center gap-2">
          <span role="img" aria-label="trainer">🏋️</span> Trainers
        </h3>
        <button
          onClick={handleAddTrainer}
          className="bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold py-2 px-6 rounded-xl shadow-lg transition-all duration-200"
        >
          + Add Trainer
        </button>
      </div>
      {loading ? (
        <p className="text-blue-600 text-center">Loading trainers...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : trainers.length === 0 ? (
        <p className="text-gray-600 text-center">No trainers available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md border border-blue-200 hover:shadow-xl transition group"
            >
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-700 mb-4">
                {trainer.title ? trainer.title+'.' : ''}{trainer.firstName ? trainer.firstName : ''}
              </div>
              <div className="flex-1 text-center">
                <p className="text-md text-blue-600 font-medium mb-1">{trainer.specialty}</p>
                <p className="text-xs text-gray-500 mb-1">{trainer.gender}, {trainer.dob}</p>
                <p className="text-xs text-gray-500 mb-1">{trainer.email} | {trainer.phone}</p>
                <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full mb-1">ID: {trainer.id}</span>
                <div className="mt-2 text-xs text-gray-700">
                  <strong>Experience:</strong> {trainer.experienceYears} yrs<br />
                  <span className="italic">{trainer.experienceDesc}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Modal for Add Trainer */}
      {modalOpen && (
        <AddTrainerModal
          open={modalOpen}
          onClose={() => setModalOpen(false)} onSubmit={function (form: { title: string; firstName: string; lastName: string; gender: string; dob: string; email: string; phone: string; experienceYears: string; experienceDesc: string; specialty: string; }): void {
            throw new Error('Function not implemented.');
          } }        />
      )}
    </div>
  );
};

export default TrainerList;

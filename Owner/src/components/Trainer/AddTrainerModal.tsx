import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addTrainer } from '../../redux/trainerSlice';

interface AddTrainerModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (form: { title: string; firstName: string; lastName: string; gender: string; dob: string; email: string; phone: string; experienceYears: string; experienceDesc: string; specialty: string; }) => void;
}

const AddTrainerModal: React.FC<AddTrainerModalProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { loading, error } = useSelector((state: any) => state.trainers);
  const [form, setForm] = useState({
    title: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    email: '',
    phone: '',
    experienceYears: '',
    experienceDesc: '',
    specialty: '',
  });
  const [localError, setLocalError] = useState('');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.title.trim() ||
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.specialty.trim() ||
      !form.gender ||
      !form.dob ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.experienceYears.trim() ||
      !form.experienceDesc.trim()
    ) {
      setLocalError('All fields are required.');
      return;
    }
    setLocalError('');
    await dispatch(addTrainer(form));
    setForm({
      title: '',
      firstName: '',
      lastName: '',
      gender: '',
      dob: '',
      email: '',
      phone: '',
      experienceYears: '',
      experienceDesc: '',
      specialty: '',
    });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg relative border-2 border-blue-200 animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-blue-700 text-3xl font-bold transition"
          aria-label="Close"
        >
          &times;
        </button>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <h2 className="text-2xl font-extrabold text-blue-700 mb-4 text-center tracking-tight">Add New Trainer</h2>
          {(localError || error) && <div className="text-red-500 text-sm text-center mb-2">{localError || error}</div>}

          <div className="bg-blue-50 rounded-xl p-4 mb-2">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Title</label>
                <select
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                  required
                >
                  <option value="">Select</option>
                  <option value="Mr">Mr</option>
                  <option value="Ms">Ms</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Dr">Dr</option>
                  <option value="Coach">Coach</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">First Name</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                  placeholder="First Name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Last Name</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Date of Birth</label>
                <input
                  name="dob"
                  type="date"
                  value={form.dob}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 mb-2">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                  placeholder="Email address"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Phone</label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                  placeholder="Phone number"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 mb-2">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Experience Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Specialty</label>
                <input
                  name="specialty"
                  value={form.specialty}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                  placeholder="e.g. Yoga, Strength, Cardio"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Experience (Years)</label>
                <input
                  name="experienceYears"
                  type="number"
                  min="0"
                  value={form.experienceYears}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                  placeholder="Years of experience"
                  required
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-gray-700 font-semibold mb-1">Experience Description</label>
              <textarea
                name="experienceDesc"
                value={form.experienceDesc}
                onChange={handleFormChange}
                className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white min-h-[60px]"
                placeholder="Describe experience, certifications, etc."
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-xl font-bold text-lg shadow-md hover:from-blue-700 hover:to-blue-500 transition-all duration-200 tracking-wide"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Trainer'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTrainerModal;
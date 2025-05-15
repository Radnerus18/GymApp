// src/features/auth/RegisterAdmin.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store';
import { registerAdmin } from '../../redux/authSlice';

const RegisterAdmin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });

  const { loading } = useSelector((state: RootState) => state.auth);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(registerAdmin(formData));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-6 bg-white shadow rounded space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">Admin Registration</h2>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="w-full px-3 py-2 border rounded"
      />

      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full px-3 py-2 border rounded"
      />

      <input
        name="phoneNumber"
        type="text"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="PhoneNumber"
        required
        className="w-full px-3 py-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? 'Registering…' : 'Register'}
      </button>

    </form>
  );
};

export default RegisterAdmin;

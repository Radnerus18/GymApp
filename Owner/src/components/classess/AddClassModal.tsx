import React, { useState,useEffect,useRef } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
interface AddClassModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  trainers: string[];
  types: string[];
  classType:string
}

const AddClassModal: React.FC<AddClassModalProps> = ({ open, onClose, onSuccess,trainers,types,classType }) => {
  const { adminId } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState({
    title: '',
    time: '',
    trainer: '',
    day: '',
    type: '',
    classType:classType,
    adminId:adminId
  }); 
  
  const modalRef = useRef<HTMLDivElement>(null);
  const firstEl = useRef<HTMLInputElement>(null);
  const lastEl = useRef<HTMLButtonElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, adminId:adminId,[e.target.name]: e.target.value });
  };
useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && modalRef.current) {
        const focusableEls = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusableEls[0];
        const last = focusableEls[focusableEls.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    if (open) {
      setTimeout(() => firstEl.current?.focus(), 0); // Focus first element when opened
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert(adminId)
    try {
      await axios.post(
        import.meta.env.VITE_APP_AXIOS_URL_1 + '/api/classes/create',
        { ...form }
      );
      alert('✅ Class created successfully!');
      setForm({ title: '', time: '', trainer: '', day: '', type: '',classType:classType,adminId:adminId });
      onClose();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      alert('❌ Failed to create class');
      console.error(error);
    }
  };

  if (!open) return null;

  return (
    <div
  className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60"
>
  <div
    ref={modalRef}
    className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl ring-1 ring-black/10 p-8 transition-all duration-300"
  >
    <button
      onClick={onClose}
      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold transition"
      aria-label="Close"
    >
      &times;
    </button>

    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">
        Create New Class
      </h2>

      <input
        ref={firstEl}
        name="title"
        placeholder="Class Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <input
        name="time"
        type="time"
        value={form.time}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <select
        name="trainer"
        value={form.trainer}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="">Select Trainer</option>
        {trainers.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>

      {classType !== "today" && (
        <select
          name="day"
          value={form.day}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Select Day</option>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      )}

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="">Select Workout Type</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <button
        ref={lastEl}
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition"
      >
        Add Class
      </button>
    </form>
  </div>
</div>

  );
};

export default AddClassModal;

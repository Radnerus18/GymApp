import React, { useState,useEffect,useRef } from 'react';
import axios from 'axios';

interface AddClassModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  trainers: string[];
  types: string[];
}

const AddClassModal: React.FC<AddClassModalProps> = ({ open, onClose, onSuccess,trainers,types }) => {
  const [form, setForm] = useState({
    title: '',
    time: '',
    trainer: '',
    day: '',
    type: ''
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const firstEl = useRef<HTMLInputElement>(null);
  const lastEl = useRef<HTMLButtonElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    try {
      await axios.post(
        import.meta.env.VITE_APP_AXIOS_URL_1 + '/api/classes/create',
        { ...form }
      );
      alert('✅ Class created successfully!');
      setForm({ title: '', time: '', trainer: '', day: '', type: '' });
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40" style={{backgroundColor:'#000000b3'}}>
      <div ref={modalRef} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
          aria-label="Close"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit} className="space-y-3">
            <h2 className="text-xl font-semibold text-blue-700">Create New Class</h2>
            <input ref={firstEl} name="title" placeholder="Class Title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" />
            <input name="time" type="time" value={form.time} onChange={handleChange} className="w-full p-2 border rounded" />
            <select
            name="trainer"
            value={form.trainer}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            >
              <option value="">Select Trainer</option>
              {
                trainers.map(e=>(
                  <option key={e} value={e}>{e}</option>
                ))
              }
            {/* Replace the trainer names below with your actual trainer list */}
            
            </select>
          <select name="day" value={form.day} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select Day</option>
            {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
            </select>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Workout Type</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button ref={lastEl} type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Class</button>
        </form>
      </div>
    </div>
  );
};

export default AddClassModal;

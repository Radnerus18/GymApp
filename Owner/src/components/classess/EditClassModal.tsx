import React, { useState, useEffect, useRef } from 'react';
import { useSelector,useDispatch } from "react-redux";
import { RootState,AppDispatch } from "../../redux/store";
import { updateClass } from '../../redux/classSlice';
interface EditClassModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  trainers: string[];
  types: string[];
  classType: string;
  classData: {
    id: string;
    title: string;
    time: string;
    trainer: string;
    day: string;
    type: string;
  };
}

const EditClassModal: React.FC<EditClassModalProps> = ({ open, onClose, onSuccess, trainers, types, classType, classData }) => {
  const { adminId } = useSelector((state: RootState) => state.auth);
  const [form, setForm] = useState({ ...classData, classType, adminId });
    const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    setForm({ ...classData, classType, adminId });
  }, [classData, classType, adminId]);

  const modalRef = useRef<HTMLDivElement>(null);
  const firstEl = useRef<HTMLInputElement>(null);
  const lastEl = useRef<HTMLButtonElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, adminId, [e.target.name]: e.target.value });
  };
  useEffect(()=>{
    console.log('formCheck',form)
  },[])
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
      setTimeout(() => firstEl.current?.focus(), 0);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Convert id to number if required by Class type
      const classDataForDispatch = {
        ...form,
        name: form.title,
        id: Number(form.id), // Ensure id is a number
      };
      await dispatch(updateClass({ classId: form.id, classData: classDataForDispatch }));
      alert('✅ Class updated successfully!');
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      alert('❌ Failed to update class');
      console.error(error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40" style={{ backgroundColor: '#000000b3' }}>
      <div ref={modalRef} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
          aria-label="Close"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit} className="space-y-3">
          <h2 className="text-xl font-semibold text-blue-700">Edit Class</h2>
          <input ref={firstEl} name="title" placeholder="Class Title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="time" type="time" value={form.time} onChange={handleChange} className="w-full p-2 border rounded" />
          <select
            name="trainer"
            value={form.trainer}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Trainer</option>
            {trainers.map(e => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
          {classType !== "today" && (
            <select name="day" value={form.day} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="">Select Day</option>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          )}
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Workout Type</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <button ref={lastEl} type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update Class</button>
        </form>
      </div>
    </div>
  );
};

export default EditClassModal;

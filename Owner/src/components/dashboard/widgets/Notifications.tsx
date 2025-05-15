import { BellIcon, AlertTriangle, MessageSquare } from 'lucide-react';
import { NotificationProps } from '../../../types/types';

const notifications: NotificationProps[] = [
  {
    id: 1,
    type: 'message',
    content: 'New message from John Doe',
    time: '2 mins ago',
  },
  {
    id: 2,
    type: 'alert',
    content: 'Client plan expiring tomorrow',
    time: '1 hour ago',
  },
  {
    id: 3,
    type: 'message',
    content: 'Support ticket replied',
    time: '3 hours ago',
  },
  {
    id: 4,
    type: 'alert',
    content: 'New client joined: Jane Smith',
    time: 'Today',
  },
];

const Notifications = () => {
  return (
    <div className="w-full h-90 bg-white shadow-md rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <BellIcon className="w-5 h-5 text-blue-600" />
          Notifications
        </h3>
        <span className="text-sm text-gray-400 cursor-pointer hover:text-gray-600">View All</span>
      </div>
      <div className="space-y-3 max-h-[100%] overflow-y-auto pr-1">
        {notifications.map((note) => (
          <div
            key={note.id}
            className="flex items-start gap-3 p-2 rounded hover:bg-gray-100 transition"
          >
            {note.type === 'message' ? (
              <MessageSquare className="text-blue-500 w-5 h-5 mt-1" />
            ) : (
              <AlertTriangle className="text-yellow-500 w-5 h-5 mt-1" />
            )}
            <div className="text-sm">
              <p className="text-gray-800">{note.content}</p>
              <p className="text-xs text-gray-400">{note.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;

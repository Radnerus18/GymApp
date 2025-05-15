import {  useState } from 'react';

interface Request {
  name: string;
  avatar: string;
  message: string;
}

const mockRequests: Request[] = [
  {
    name: 'Surendar S',
    avatar: 'https://i.pravatar.cc/150?img=11',
    message: 'Requested training on Thursday',
  },
  {
    name: 'Aarthi V',
    avatar: 'https://i.pravatar.cc/150?img=32',
    message: 'Needs a session today evening',
  },
];

const TrainingRequest = () => {
  const [nudged, setNudged] = useState<{ [key: string]: boolean }>({});

  const handleNudge = (name: string) => {
    setNudged({ ...nudged, [name]: true });
    setTimeout(() => setNudged((prev) => ({ ...prev, [name]: false })), 2000);
  };

  return (
    <div className="bg-purple-50 border border-purple-200 p-4 rounded-2xl shadow-sm">
        <h3 className="text-lg font-semibold text-purple-700 mb-3">🔔 Training Requests</h3>
        <ul className="space-y-2 max-h-[80dvh] overflow-y-auto">
          {mockRequests.map((req) => (
            <li key={req.name} className="flex items-center justify-between gap-3 bg-white p-3 rounded shadow-sm border border-purple-100">
              <div className="flex items-center gap-3">
                <img src={req.avatar} alt={req.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-medium">{req.name}</p>
                  <p className="text-sm text-gray-500">{req.message}</p>
                </div>
              </div>
              <button
                onClick={() => handleNudge(req.name)}
                disabled={nudged[req.name]}
                className={`text-sm px-3 py-1 rounded-lg shadow transition ${
                  nudged[req.name]
                    ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                {nudged[req.name] ? 'Nudged' : 'Nudge'}
              </button>
            </li>
          ))}
        </ul>
      </div>
  );
};

export default TrainingRequest;

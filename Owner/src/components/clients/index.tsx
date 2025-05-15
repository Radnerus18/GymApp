import ClientList from "./ClientList";
import ClientForm from "./ClientForm";
import { useState } from "react";
import ErrorBoundary from "../ErrorBoundary";
const Clients = () => {
  const [openForm, setOpenForm] = useState(false);
  return (
    <ErrorBoundary>
      <div className="w-full p-4 relative bg-gray-50 rounded-l-[20px]">
        {!openForm && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">
              Client List
            </h2>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
              onClick={() => setOpenForm(true)}
            >
              + Add New User
            </button>
          </div>
        )}

        <div className="w-full h-[100dvh]">
          {openForm ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-700">
                  Add New Client
                </h2>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg shadow transition"
                  onClick={() => setOpenForm(false)}
                >
                  ← Back to List
                </button>
              </div>
              <ClientForm />
            </div>
          ) : (
            <ClientList />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Clients;

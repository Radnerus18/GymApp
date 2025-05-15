import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { Eye, Trash2, RefreshCwIcon } from "lucide-react";
import { useDispatch,useSelector } from "react-redux";
import { AppDispatch,RootState } from "../../redux/store";
import { fetchAdminMe } from "../../redux/authSlice";
const ClientList = () => {
  interface Client {
    clientId: string;
    name: string;
    email: string;
    phoneNumber: number;
    membership:{
      plan: string;
    },
    joiningDate: string;
    address: string;
    city: string;
    pinCode: string;
    age: number;
    dob: string;
    gender: string;
  }
  
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [isRotating, setIsRotating] = useState(false);
  const searchInp = useRef<HTMLInputElement | null>(null);
  const [page, setPage] = useState(1);
  const totalPages = 5;
const dispatch = useDispatch<AppDispatch>();
  const { adminId } = useSelector((state: RootState) => state.auth);
  const handleRefresh = async () => {
    setIsRotating(true);
    setSearchTerm("");
    if (searchInp.current) {
      searchInp.current.value = "";
    }
    await getAllUsers(adminId);
    setTimeout(() => setIsRotating(false), 500);
  };
  

  useEffect(() => {
    dispatch(fetchAdminMe());
  }, []);

  const getAllUsers = async (adminIdParam?: string) => {
    const idToUse = adminIdParam || adminId;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_AXIOS_URL_1}/api/client/getUser?adminID=${idToUse}`
      );

      const users = response?.data?.data || [];
      console.log('@@@', users);

      if (Array.isArray(users) && users.length > 0) {
        setClients(users);
        setFilteredClients(users);
      } else {
        setClients([]);
        setFilteredClients([]);
        console.warn("No users found from server.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setClients([]);
      setFilteredClients([]);
    }
  };
  

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilter = (value: string) => {
    setFilterStatus(value);
  };

  useEffect(() => {
    let result = [...clients];

    if (searchTerm) {
      result = result.filter(
        (client) =>
          client.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
          client.clientId.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    }

    // Uncomment when status field exists
    // if (filterStatus) {
    //   result = result.filter(client => client.status === filterStatus);
    // }

    setFilteredClients(result);
  }, [searchTerm, filterStatus, clients]);

  const getUserById = async (id: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_AXIOS_URL_1}/api/client/getUser/${id}`
      );
      console.log(response.data);
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      return null;
    }
  };

  useEffect(() => {
    console.log('adminId', adminId);
    handleRefresh()
  }, []);

  return (
    <div className="w-full h-[100%] bg-gradient-to-br from-white to-gray-50 shadow-lg px-8 pt-6 pb-8 mb-6 overflow-x-auto border border-gray-200 flex flex-col items-center justify-between">
      <div className="w-full">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2">
            💼 Client List
          </h2>
          <div className="flex items-center gap-2 flex-grow max-w-xl">
            <input
              ref={searchInp}
              type="text"
              placeholder="Search clients..."
              className="flex-grow px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              onChange={(e) => handleSearch(e.target.value)}
            />

            <select
              onChange={(e) => handleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <button
            onClick={handleRefresh}
            className="text-blue-700 hover:text-blue-900 p-2 rounded-full transition focus:outline-none active:ring-1 focus:ring-blue-400"
            title="Refresh"
          >
            <RefreshCwIcon
              className={`w-5 h-5 transition-transform duration-500 ${
                isRotating ? "rotate-[360deg]" : ""
              }`}
            />
          </button>
        </div>

        {filteredClients.length > 0 ? (
          <table className="w-full table-auto text-sm text-gray-800 text-center">
            <thead>
              <tr className="bg-blue-100 text-blue-800">
                <th className="px-5 py-3 font-semibold tracking-wide">No</th>
                <th className="px-5 py-3 font-semibold tracking-wide">ID</th>
                <th className="px-5 py-3 font-semibold tracking-wide">Name</th>
                <th className="px-5 py-3 font-semibold tracking-wide">Plan</th>
                <th className="px-5 py-3 font-semibold tracking-wide">Joined date</th>
                <th className="px-5 py-3 font-semibold tracking-wide">Status</th>
                <th className="px-5 py-3 font-semibold tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredClients.map((client, index) => (
                <tr
                  key={client.clientId}
                  className={`hover:bg-blue-50 transition duration-150 ${
                    index % 2 === 0 ? "bg-gray-100" : ""
                  }`}
                >
                  <td className="px-5 py-3 font-medium">{index + 1}</td>
                  <td className="px-5 py-3 font-medium">{client.clientId}</td>
                  <td className="px-5 py-3 font-medium">{client.name}</td>
                  <td className="px-5 py-3 text-gray-600">{client.membership.plan}</td>
                  <td className="px-5 py-3 text-gray-600">{client.joiningDate}</td>
                  <td className="px-5 py-3 text-gray-600">active</td>
                  <td className="px-5 py-3 flex justify-center">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) =>
                          getUserById(
                            e.currentTarget.getAttribute("data-id") || ""
                          )
                        }
                        data-id={client.clientId}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-1.5 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        data-id={client.clientId}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1.5 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h3 className="text-center text-gray-500 py-4">No records found</h3>
        )}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ClientList;

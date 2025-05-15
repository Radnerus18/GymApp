import { Bell, LogOut } from 'lucide-react';

const Topbar = () => {
  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/;';
    window.location.reload();
  }
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center w-full rounded-tl-[20px]">
      {/* Left: Welcome Message */}
      <h1 className="text-2xl font-semibold text-gray-800">Welcome, Admin</h1>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <button className="relative hover:text-blue-600 transition">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile (mock) */}
        <div className="flex items-center gap-3">
          <img
            src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
            alt="Admin"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium text-gray-700">Admin</span>
        </div>

        {/* Logout Button */}
        <button className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-md text-sm font-medium" onClick={handleLogout}>
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;

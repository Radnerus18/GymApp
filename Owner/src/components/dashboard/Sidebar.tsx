import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboardIcon,
  UsersIcon,
  BarChartIcon,
  SettingsIcon,
  BellIcon,
  ClipboardListIcon,
  MessageSquareIcon,
  CalendarClockIcon,
} from "lucide-react";
import { GiWeightLiftingUp } from "react-icons/gi";
const Sidebar = () => {
  const location = useLocation();

  const mainNav = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboardIcon size={20} /> },
    { name: "Clients", path: "/clients", icon: <UsersIcon size={20} /> },
    { name: "Classes", path: "/classes", icon: <ClipboardListIcon size={20} /> },
    { name: "Trainer", path: "/trainer", icon: <GiWeightLiftingUp size={20} /> },
    { name: "Reports", path: "/reports", icon: <BarChartIcon size={20} /> },
    { name: "Settings", path: "/settings", icon: <SettingsIcon size={20} /> },
  ];

  const insights = [
    { name: "Schedule Overview", path: "/schedule", icon: <CalendarClockIcon size={20} /> },
    { name: "PT Requests", path: "/pt-requests", icon: <ClipboardListIcon size={20} /> },
    { name: "Feedback", path: "/feedback", icon: <MessageSquareIcon size={20} /> },
    { name: "Notifications", path: "/notifications", icon: <BellIcon size={20} /> },
  ];

  const renderNavItem = (item: { name: string; path: string; icon: React.ReactNode }) => {
    const isActive = location.pathname === item.path;
    return (
      <li key={item.name}>
        <Link
          to={item.path}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 ${
            isActive ? "bg-blue-600" : "hover:bg-blue-700 hover:shadow-md"
          }`}
        >
          {item.icon}
          <span className="text-sm font-medium">{item.name}</span>
        </Link>
      </li>
    );
  };

  return (
    <div className="w-64 bg-blue-800 text-white min-h-screen p-6 shadow-lg flex flex-col " style={{minWidth:'15%',maxWidth:'15%'}}>
      <div className="fixed">
            <h2 className="text-3xl font-bold mb-8 tracking-wide">Super Being</h2>

      <div className="mb-6">
        <h3 className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">Main</h3>
        <ul className="space-y-2">{mainNav.map(renderNavItem)}</ul>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">Insights</h3>
        <ul className="space-y-2">{insights.map(renderNavItem)}</ul>
      </div>
      </div>
    </div>
  );
};

export default Sidebar;

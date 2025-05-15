import Sidebar from './components/dashboard/Sidebar';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="flex bg-blue-800">
        <Sidebar/>
        <div className='w-full rounded-2xl'>
          <Outlet />
        </div>
    </div>
  );
};

export default AppLayout;

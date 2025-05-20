import Sidebar from './components/dashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import { useDispatch,} from 'react-redux';
import { AppDispatch } from './redux/store';
import { fetchAdminMe } from './redux/authSlice';
import { useEffect } from 'react';
const AppLayout = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(()=>{
    dispatch(fetchAdminMe())
  },[dispatch])
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

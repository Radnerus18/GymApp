import React, { useState } from 'react';
import { ToastContainer,toast} from 'react-toastify';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store';
import { adminLogin } from '../../redux/authSlice';
const Login: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [userDetails, setUserDetails] = useState({
        adminId: '', 
        password: '',
    });
    const { loading, error } = useSelector((state: RootState) => state.auth);
    const nav = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const resultAction = await dispatch(adminLogin(userDetails));
        if (adminLogin.fulfilled.match(resultAction)) {
            // Get token from response payload
            const token = resultAction.payload?.data.token;
            if (token) {
                document.cookie = `token=${token}; path=/;`;
            }
            nav('/');
            setTimeout(() => {
                toast.success('Login successful!');
            }, 500);
        }
    };
    if(error){
        return <div>Some Error</div>
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div>
                        <label htmlFor="userid" className="block text-sm font-medium text-gray-700">
                            User ID
                        </label>
                        <input
                            type="text"
                            id="userid"
                            value={userDetails.adminId}
                            onChange={(e) => setUserDetails({...userDetails,adminId:e.target.value})}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setUserDetails({...userDetails,password:e.target.value})}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
                    >
                        {loading?'Loading....':'Login'}
                    </button>
                </form>
                <div>
                    <p className="text-sm text-center">
                        Don't have an account?{' '}
                        <Link to="/registration" className="text-indigo-600 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
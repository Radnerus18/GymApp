import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-6 text-center">
      <h1 className="text-8xl font-extrabold text-blue-600">404</h1>
      <p className="text-2xl md:text-3xl font-semibold text-gray-800 mt-4">
        Oops! Page not found.
      </p>
      <p className="text-gray-500 mt-2">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <button
        onClick={() => navigate('/')}
        className="mt-6 px-5 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2 transition"
      >
        <ArrowLeft size={18} />
        Go Home
      </button>

      <img
        src="https://illustrations.popsy.co/gray/web-error.svg"
        alt="404 Illustration"
        className="w-64 mt-8"
      />
    </div>
  );
};

export default NotFoundPage;

import Topbar from './Topbar';
import Widgets from './Widgets';

const Home = () => {
  return (
    <div className="w-[100%] flex-1 rounded-l-[20px] bg-gray-100">
        <Topbar />
        <div className="p-5 w-[100%]">
          <h1 className="text-2xl font-semibold text-gray-700 mb-2">Dashboard</h1>
          <Widgets />
        </div>
      </div>
  );
};

export default Home;
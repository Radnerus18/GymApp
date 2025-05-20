import { useEffect, useState,useMemo,memo, useCallback } from "react";
import TodaysClasses from "./TodayClasses";
import WeeklyClasses from "./WeeklyClasses";
import PersonalTraining from "./PersonalTraining";
import TrainingRequest from "./Schedule";
import { RefreshCwIcon } from "lucide-react";
import { useDispatch,useSelector } from "react-redux";
import { RootState,AppDispatch } from "../../redux/store";
import { fetchClasses } from "../../redux/classSlice";
import { ClassItem,ClassDataType } from "../../types/types";
import { deleteClass } from '../../redux/classSlice';


const Classes = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { adminId } = useSelector((state: RootState) => state.auth);
  const {classes} = useSelector((state:RootState)=>state.class)
  const [isRotating, setIsRotating] = useState(false);
  const initialClassData = useMemo<ClassDataType>(() => ({
    today: [],
    weekly: [],
    personal: [],
    request: [],
  }), []);
  
  const [classData, setClassData] = useState<ClassDataType>(initialClassData);

  const handleRefresh = useCallback(async () => {
    setIsRotating(true);
    dispatch(fetchClasses(adminId))
    setTimeout(() => setIsRotating(false), 500);
  }, [adminId, dispatch])

  useEffect(()=>{
    dispatch(fetchClasses(adminId))
  },[adminId,dispatch])
  useEffect(() => {
    if (Array.isArray(classes)) {
      const todayClasses = (classes as unknown as ClassItem[]).filter((cls) => cls.classType === 'today');
      const weeklyClasses = (classes as unknown as ClassItem[]).filter((cls) => cls.classType === 'weekly');
      const personalTrainings = (classes as unknown as ClassItem[]).filter((cls) => cls.classType === 'personal');
      const trainingRequests = (classes as unknown as ClassItem[]).filter((cls) => cls.classType === 'request');

      setClassData({
        today: todayClasses,
        weekly: weeklyClasses,
        personal: personalTrainings,
        request: trainingRequests,
      });
    } else {
      setClassData(initialClassData); // reset to empty if `classes` is invalid
    }
  }, [classes,initialClassData]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDeleteClass = (res: any) => {
    const cls2del = res;
    dispatch(deleteClass({ adminId, classId: cls2del[0]._id }));
  }


  return (
    <div className="flex flex-col h-screen bg-white rounded-l-[20px] p-6">
  {/* Header with Refresh Button */}
  <div className="flex justify-end mb-4 shrink-0">
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

  {/* Scrollable Component Grid taking full remaining height */}
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 overflow-y-auto flex-grow">
    {/* Today's Classes */}
    <TodaysClasses clsdata={classData.today} deleteClass={handleDeleteClass}/>

    {/* Weekly Classes */}
    <WeeklyClasses  clsdata={classData.weekly} deleteClass={handleDeleteClass}/>

    {/* Personal Trainings */}
    <PersonalTraining />

    {/* Training Requests */}
    <TrainingRequest />
  </div>
</div>

  );
};

export default memo(Classes);

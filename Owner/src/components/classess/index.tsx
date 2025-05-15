import TodaysClasses from './TodayClasses';
import WeeklyClasses from './WeeklyClasses';
import PersonalTraining from './PersonalTraining';
import TrainingRequest from './Schedule';
const Classes = () => {
  return (
    <div className="bg-white h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 p-6 rounded-l-[20px]">
      {/* Today's Classes */}
      <TodaysClasses/>

      {/* Weekly Classes */}
      <WeeklyClasses/>

      {/* Personal Trainings */}
      <PersonalTraining/>

      {/* Training Requests */}
      <TrainingRequest/>
    </div>
  )
}

export default Classes
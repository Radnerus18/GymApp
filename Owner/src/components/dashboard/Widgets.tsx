import Members from "./widgets/Members";
import AttendanceWidget from "./widgets/Attendence";
import ActiveMembersCard from "./widgets/ActiveMembers";
import GenderStatsCard from "./widgets/GenderStatsCard";
import CheckinsThisWeekCard from "./widgets/CheckinsThisWeekCard";
import PlanBreakdown from "./widgets/PlanBreakdown";
import RevenueSummary from "./widgets/RevenueSummary";
import Notifications from "./widgets/Notifications";
const revenueData = [
  { name: "W1", value: 4000 },
  { name: "W2", value: 6500 },
  { name: "W3", value: 5500 },
  { name: "W4", value: 7200 },
  { name: "W5", value: 8200 },
];
const Widgets = () => {
  return (
    <div className="flex justify-between w-[100%] gap-3">
      <div className="flex flex-1 flex-col justify-between items-between">
        <Members />
        <PlanBreakdown />
        <GenderStatsCard maleCount={70} femaleCount={50} />
      </div>
      <div className="flex flex-1 flex-col justify-between items-between">
        <AttendanceWidget />
        <ActiveMembersCard />
        <RevenueSummary totalRevenue={23200} month="May" data={revenueData} />
      </div>
      <div className="flex flex-1 flex-col items-between justify-between px-5 gap-3">
        <CheckinsThisWeekCard
          total={26}
          checkinData={[
            { day: "S", count: 3 },
            { day: "M", count: 2 },
            { day: "T", count: 2 },
            { day: "W", count: 5 },
            { day: "T", count: 3 },
            { day: "F", count: 4 },
            { day: "S", count: 7 },
          ]}
        />
        <Notifications />
      </div>
    </div>
  );
};

export default Widgets;

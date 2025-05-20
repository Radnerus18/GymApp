export interface NewClient{
    role:string,
    full_name:string,
    age:number,
    dob:string,
    gender:string,
    email:string,
    phoneNumber:number,
    address:string,
    city:string,
    pincode:string,
    plan:string,
    adminId:string
}
export interface OtpVerify{
    onVerify: (otp: string) => void;
    email:string;
}
export interface MembershipProps{
    name:string,
    duration:string,
    cost:number,
}
export interface AttendenceProps{
    name:string,
    time:string,
    plan:string
}
export interface GenderStatsCardProps {
    maleCount: number;
    femaleCount: number;
}
export interface CheckinsThisWeekCardProps {
checkinData: { day: string; count: number }[];
total: number;
}
export interface RevenueSummaryProps {
  totalRevenue: number;
  month?: string;
  data: { name: string; value: number }[];
}
export interface NotificationProps{
    id: number;
    type: 'message' | 'alert';
    content: string;
    time: string;
};
export interface ClassItem {
  _id: any;
  classType: 'today' | 'weekly' | 'personal' | 'request' | string; // use union type if known
  // ... other fields
}
export interface ClassDataType {
  today: ClassItem[];
  weekly: ClassItem[];
  personal: ClassItem[];
  request: ClassItem[];
}
export interface ClassesDataProps {
  clsdata: object; // Replace 'any' with a more specific type if available
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteClass:(res:any)=>void
}
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
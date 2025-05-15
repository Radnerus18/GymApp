import { useState } from "react";
import { OtpVerify } from "../../types/types";
import axios from "axios";
import { BeatLoader } from "react-spinners";
export default function OTPVerification({ onVerify,email }: OtpVerify) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading,setLoading] = useState(false)
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true)
    const enteredOtp = otp.join("")
    try {
        const verifyOtp = await axios.post(import.meta.env.VITE_APP_AXIOS_URL_1+'/verify-otp',{email,otp:enteredOtp})
        setTimeout(() => {
            onVerify(verifyOtp.data.verified);
        }, 5000);
    } catch (error) {
        console.log('Error in verifying otp',error)
    }finally{setLoading(true)}
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md text-center space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">Verify OTP</h2>
      <p className="text-sm text-gray-500">Enter the 6-digit code sent to your email</p>

      <form className="space-y-6">
        <div className="flex justify-center space-x-2">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              className="w-12 h-12 text-center text-xl border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? <BeatLoader color="#fff"/>:'Verify'}
        </button>
      </form>
    </div>
  );
}

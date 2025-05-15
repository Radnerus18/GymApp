import React, { useEffect, useState } from "react";
import { NewClient } from "../../types/types";
import OTPVerification from "../auth/Otp_verify";
import axios from "axios";
import OtpSuccessMessage from "../auth/Otp-result";
import MembershipDropdown from "./Memebership";
import { BeatLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { postData } from "../../redux/slice";
const inputStyle =
  "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300";

const ClientForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [loading, setLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [newClientData, setNewClientData] = useState<NewClient>({
    role: "client",
    full_name: "",
    age: 0,
    dob: "",
    gender: "",
    email: "",
    phoneNumber: 0,
    address: "",
    city: "",
    pincode: "",
    plan: "",
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewClientData({
      ...newClientData,
      [e.target.name]: e.target.value,
    });
  };

  const validateFields = () => {
    const requiredFields = step === 1
      ? ["full_name", "age", "dob", "gender", "email", "phoneNumber", "address", "city", "pincode"]
      : ["plan"];

    return requiredFields.every((key) => newClientData[key as keyof NewClient]);
  };

  const handleNext = () => {
    if (!validateFields()) {
      alert("Please fill all required fields.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      alert("Please select a membership plan.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_AXIOS_URL_1}/send-otp`,
        newClientData
      );
      if (response.data.success) {
        setStep(3);
      }
    } catch (error) {
      console.error("Error sending OTP", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (otpVerified) {
      (async () => {
        const resultAction = await dispatch(postData(newClientData));
        if (postData.fulfilled.match(resultAction)) {
          console.log("Success:", resultAction.payload);
          setStep(4);
        } else {
          console.error("Failed:", resultAction.payload);
        }
      })();
    }
  }, [otpVerified, dispatch, newClientData]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-8">
      {/* Step 1: User Info */}
      {step === 1 && (
        <>
          <h2 className="text-2xl font-bold text-center text-blue-700">📝 User Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input name="full_name" placeholder="Full Name" onChange={handleFormChange} className={inputStyle} />
            <input name="age" type="number" placeholder="Age" onChange={handleFormChange} className={inputStyle} />
            <input name="dob" type="date" onChange={handleFormChange} className={inputStyle} />
            <select name="gender" onChange={handleFormChange} className={inputStyle}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input name="email" type="email" placeholder="Email" onChange={handleFormChange} className={inputStyle} />
            <input name="phoneNumber" type="tel" placeholder="Phone Number" onChange={handleFormChange} className={inputStyle} />
            <input name="address" placeholder="Address" onChange={handleFormChange} className={inputStyle} />
            <input name="city" placeholder="City" onChange={handleFormChange} className={inputStyle} />
            <input name="pincode" type="number" placeholder="Pincode" onChange={handleFormChange} className={inputStyle} />
          </div>
          <button onClick={handleNext} className="w-full mt-6 bg-blue-600 text-white font-semibold py-2 rounded-xl shadow-md hover:bg-blue-700">
            Next
          </button>
        </>
      )}

      {/* Step 2: Membership Plan */}
      {step === 2 && (
        <>
          <h2 className="text-2xl font-bold text-center text-green-700">🏋️ Select Membership Plan</h2>
          <MembershipDropdown
            onPlanSelect={(plan: string) =>
              handleFormChange({ target: { name: "plan", value: plan } } as React.ChangeEvent<HTMLInputElement>)
            }
          />
          <button onClick={handleSubmit} className="w-full mt-6 bg-green-600 text-white font-semibold py-2 rounded-xl shadow-md hover:bg-green-700">
            Submit
          </button>
        </>
      )}

      {/* Step 3: OTP */}
      {step === 3 && !otpVerified && (
        <>
          <h2 className="text-2xl font-bold text-center text-purple-700">🔐 OTP Verification</h2>
          <OTPVerification
            email={newClientData.email}
            onVerify={(otp) => setOtpVerified(otp === "true")}
          />
        </>
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <div className="text-center">
          <OtpSuccessMessage />
        </div>
      )}

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center h-32">
          <BeatLoader color="#2563EB" />
        </div>
      )}
    </div>
  );
};

export default ClientForm;

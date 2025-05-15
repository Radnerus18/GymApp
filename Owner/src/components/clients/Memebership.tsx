import React, { useState } from 'react';
import { MembershipProps } from '../../types/types';
const membershipOptions = [
  { name: 'Basic', duration: '1 Month', cost: 999 },
  { name: 'Standard', duration: '3 Months', cost: 2499 },
  { name: 'Premium', duration: '6 Months', cost: 4499 },
];

const MembershipDropdown: React.FC<{ onPlanSelect: (plan: string) => void }> = ({ onPlanSelect }) => {
  const [selectedPlan, setSelectedPlan] = useState<MembershipProps | null>(null);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-blue-50 rounded-2xl shadow-md border border-blue-200">
      <h2 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">💳 Choose Membership Plan</h2>

      <select
        onChange={(e) => {
          const plan = membershipOptions.find(p => p.name === e.target.value);
          setSelectedPlan(plan || null);
          onPlanSelect(plan?.name || '')
        }}
        className="block w-full p-3 border border-blue-300 rounded-md bg-white text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">-- Select Plan --</option>
        {membershipOptions.map((plan, index) => (
          <option key={index} value={plan.name}>
            {plan.name}
          </option>
        ))}
      </select>

      {selectedPlan && (
        <div className="mt-6 bg-white border border-blue-100 p-4 rounded-lg shadow-sm">
          <h3 className="text-md font-bold text-blue-700 mb-2">📦 Plan Details</h3>
          <div className="text-sm text-gray-700 space-y-2">
            <div><strong>Duration:</strong> {selectedPlan.duration}</div>
            <div><strong>Cost:</strong> ₹{selectedPlan.cost}</div>
            <div><strong>Benefits:</strong> 
              <ul className="list-disc ml-6 mt-1">
                <li>Unlimited Classes</li>
                <li>Access to Trainers</li>
                <li>Health Assessment</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipDropdown;

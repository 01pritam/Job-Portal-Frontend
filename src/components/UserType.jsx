import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // import custom hook

const UserType = () => {
  const [selectedType, setSelectedType] = useState('');
  const navigate = useNavigate();
  const { setUserType } = useUser(); // get setter

  const handleSelection = (type) => {
    setSelectedType(type);
  };

  const handleProceed = () => {
    if (selectedType) {
      setUserType(selectedType); // ✅ store it globally before navigating
      navigate('/login');
    }
  };
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    Choose Your Role
                </h2>
                <p className="text-center text-gray-600">
                    Select your user type to continue
                </p>
                
                <div className="grid grid-cols-1 gap-4 mt-6">
                    {['Admin', 'Employer', 'Jobseeker'].map((type) => (
                        <button
                            key={type}
                            onClick={() => handleSelection(type)}
                            className={`p-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-3
                                ${selectedType === type 
                                    ? 'bg-blue-400 text-white shadow-lg transform scale-105' 
                                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400'
                                }`}
                        >
                            <span className="text-lg font-semibold">{type}</span>
                        </button>
                    ))}
                </div>

                {selectedType && (
                    <div className="text-center mt-6 space-y-4">
                        <p className="text-gray-600">
                            Selected Role: <span className="font-semibold text-blue-400">{selectedType}</span>
                        </p>
                        <button
                            onClick={handleProceed}
                            className="w-full bg-blue-400 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
                        >
                            Proceed to Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserType;
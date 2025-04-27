import React, { useState, useEffect } from 'react';

const CompanyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with dummy data
    setTimeout(() => {
      setProfile({
        companyName: 'Acme Corp',
        email: 'info@acmecorp.com',
        location: 'New York, USA',
        description: 'Leading provider of innovative solutions for businesses worldwide.',
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!profile) return null;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-4">Company Profile</h2>
      <div className="mb-2">
        <span className="font-semibold">Company Name:</span> {profile.companyName}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Email:</span> {profile.email}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Location:</span> {profile.location}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Description:</span> {profile.description}
      </div>
    </div>
  );
};

export default CompanyProfile;